"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { convertArrayOfObjectsToWorksheet } from "@/utils/helperFunc";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import { useDraws, getGameDraws } from "@/hooks/useDraws";
import LottonownowTable from "@/components/table/LottonownowTable";
import FullGameDetails from "@/components/modals/FullGameDetails";
import FilterSearchModal from "@/components/modals/FilterModal";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const { data: draws, refetch, isLoading } = useDraws(filters);
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const downloadDataHandler = async () => {
    setProcessing(true);
    const allDraws = await getGameDraws({
      isExport: true,
      ...filters,
    });
    setProcessing(false);
    const modifiedData = allDraws?.map((item: any) => ({
      "Draw Name": item?.drawType?.name,
      "Draw Cycle ID": item?.id,
      "No of Tickets": item?.tickets?.length,
      "No of Winners": item?.winners?.length,
      "No of Stakes": item?.tickets?.length,
      "Winning Numbers": item?.winningNumbers?.join(", "),
      "Draw Date And Time": item?.drawDate
        ? moment(item?.drawDate).format("DD/MM/YYYY hh:mm A")
        : "N/A",
      "Stake Amount": item?.drawType?.stakeAmount,
      "Number of Tickets Sold": item?.tickets?.length,
      "Total Ticket Sales": item?.tickets?.reduce(
        (acc: any, curr: any) => acc + curr?.amount,
        0
      ),
      "Number of Winners": item?.drawType?.numberOfWinners,
      "Total Winning Amount": item?.winners?.reduce(
        (acc: any, curr: any) => acc + curr?.winningAmount,
        0
      ),
      "Total Profit":
        item?.tickets?.reduce((acc: any, curr: any) => acc + curr?.amount, 0) -
        item?.winners?.reduce(
          (acc: any, curr: any) => acc + curr?.winningAmount,
          0
        ),
      "Draw Status": item?.status,
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Draws Report-${new Date().toDateString()}`
    );
    setProcessing(false);
  };
  const menuOptions = [
    {
      name: "View",
      action: (item: any) => {
        setSelectedGame(item);
        setShowModal(true);
      },
    },
  ];
  console.log(draws, "draws");
  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={() => setOpen(true)}
          title={"Export Draws"}
          disabled={processing}
          processing={processing}
        />
      </div>
      <p className="font-extrabold text-xl">Game Draws</p>
      <div className="my-10">
        <LottonownowTable
          title={"Game Draws"}
          subTitle={"These are the game draws"}
          columns={columns}
          meta={draws?.meta}
          data={(draws?.data || []).map((item: any) => ({
            ...item,
            drawDate: item?.drawDate
              ? moment(item?.drawDate).format("DD/MM/YYYY hh:mm A")
              : "N/A",
            noOfTickets: item?.tickets?.length,
            noOfWinners: item?.winners?.length,
            stakes: item?.tickets?.length,
            winningNumbers: item?.winningNumbers?.join(", "),
            status: item?.status === "closed" ? "Cancelled" : item?.status,
          }))}
          loading={isLoading}
          filters={filters}
          setFilters={setFilters}
          showSearch={true}
          nextPageHandler={nextPageHandler}
          menuOptions={menuOptions}
        />
      </div>

      {showModal && (
        <FullGameDetails
          open={showModal}
          setOpen={() => setShowModal(false)}
          game={selectedGame}
        />
      )}

      {open && (
        <FilterSearchModal
          open={open}
          setOpen={setOpen}
          proceedHandler={downloadDataHandler}
          filters={filters}
          setFilters={setFilters}
          processing={processing}
          selectData={[
            { id: "drawn", name: "Drawn / Completed" },
            { id: "closed", name: "Closed / Cancelled" },
            { id: "closed", name: "Closed / Cancelled" },
            { id: "Pending", name: "Pending" },
            { id: "ongoing", name: "Ongoing" },
          ]}
        />
      )}
    </div>
  );
}

export default Page;

const columns = [
  {
    Header: "Cycle ID",
    accessor: "id",
  },
  {
    Header: "Number Of Tickets",
    accessor: "noOfTickets",
  },
  {
    Header: "Draw Date",
    accessor: "drawDate",
  },

  {
    Header: "Draw Status",
    accessor: "status",
  },
  {
    Header: "Number Of Winners",
    accessor: "noOfWinners",
  },
  {
    Header: "Winning Numbers",
    accessor: "winningNumbers",
  },
];
