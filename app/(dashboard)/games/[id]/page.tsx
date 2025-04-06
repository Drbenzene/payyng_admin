"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGameDrawTypes } from "@/hooks/useGameDrawTypes";
import LottonownowTable from "@/components/table/LottonownowTable";
import moment from "moment";
import FullGameDetails from "@/components/modals/FullGameDetails";
import BackButton from "@/components/buttons/BackButton";

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

function GameDetailsPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [filters, setFilters] = useState({});
  const {
    data: games,
    isLoading,
    refetch,
  } = useGameDrawTypes(id as string, filters);

  const menuOptions = [
    {
      name: "View",
      action: (item: any) => {
        setSelectedGame(item);
        setShowModal(true);
      },
    },
  ];

  console.log(selectedGame, "selectedGame");

  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  return (
    <div>
      <BackButton />
      <section className="my-10">
        <LottonownowTable
          title={"Draw Type Games"}
          subTitle={"These are the games under this draw type"}
          columns={columns}
          meta={games?.meta}
          data={(games?.data || []).map((item: any) => ({
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
          menuOptions={menuOptions}
        />
      </section>

      {showModal && (
        <FullGameDetails
          open={showModal}
          setOpen={() => setShowModal(false)}
          game={selectedGame}
        />
      )}
    </div>
  );
}

export default GameDetailsPage;
