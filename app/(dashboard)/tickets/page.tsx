"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import { useAllTickets, getAllTickets } from "@/hooks/useAllTickets";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const { data: allTickets, refetch, isLoading } = useAllTickets(filters);
  const [processing, setProcessing] = useState(false);

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const downloadDataHandler = async () => {
    setProcessing(true);
    const allTickets = await getAllTickets({
      isExport: true,
    });
    setProcessing(false);
    const modifiedData = allTickets?.map((item: any) => ({
      "Ticket No.": item?.ticketNumber,
      Amount: item?.amount,
      "Date & Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
      "Staked numbers": item?.drawNumberSelection
        ?.map((item: any) => item.selectedNumber)
        .join(", "),
      Status: item?.status,
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Tickes Report-${new Date().toDateString()}`
    );
    setProcessing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={downloadDataHandler}
          title={"Export Tickets"}
          disabled={processing}
          processing={processing}
        />
      </div>

      <p className="font-extrabold text-xl">Tickets</p>

      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(allTickets?.data || []).map((ticket: any) => ({
            ...ticket,
            transaction: ticket?.transactionType,
            amount: currencyFormat(ticket?.amount),
            date: moment(ticket?.createdAt).format("DD/MM/YYYY hh:mm A"),
            tickedtSelectedNumbers: ticket?.drawNumberSelection
              ?.map((item: any) => item.selectedNumber)
              .join(", "),
          }))}
          title="Tickets"
          meta={allTickets?.meta}
          subTitle={"These are tickets played for all games"}
          nextPageHandler={nextPageHandler}
          showSearch={true}
          setFilters={setFilters}
          hideActions={true}
        />
      </div>
    </div>
  );
}

export default Page;

const columns = [
  {
    Header: "Ticket No.",
    accessor: "ticketNumber",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Date and Time",
    accessor: "date",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Selected Numbers",
    accessor: "tickedtSelectedNumbers",
  },
];
