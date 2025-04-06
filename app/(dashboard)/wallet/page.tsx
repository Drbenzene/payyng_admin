"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTransactions, getTransactions } from "@/hooks/useTransactions";
import { useWinners } from "@/hooks/useWinners";
import { useWalletStats } from "@/hooks/useWallet";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";

const columns = [
  {
    Header: "Player Name",
    accessor: "playerName",
  },
  {
    Header: "Transaction",
    accessor: "tag",
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
    Header: "Transaction ID",
    accessor: "reference",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const winnerColumns = [
  {
    Header: "Player Name",
    accessor: "playerName",
  },
  {
    Header: "Winning Ticket",
    accessor: "ticket",
  },
  {
    Header: "Unique ID",
    accessor: "id",
  },
  {
    Header: "Payout Amount",
    accessor: "amount",
  },
  {
    Header: "Payout Date",
    accessor: "date",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

function Page() {
  const [filters, setFilters] = useState<any>({});
  const [winnersFilters, setWinnersFilters] = useState<any>({});
  const [processing, setProcessing] = useState(false);

  const { data: statsData } = useWalletStats();
  const {
    data: winners,
    isLoading: isWinnersLoading,
    refetch: refetchWinners,
  } = useWinners({
    ...winnersFilters,
  });

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useTransactions({
    ...filters,
  });

  const stats = [
    {
      name: "Total Wallet Balance",
      stat: `${currencyFormat(
        statsData?.gameBalance + statsData?.withdrawableBalance
      )}`,
    },
    {
      name: "Total Game Balance",
      stat: `${currencyFormat(statsData?.gameBalance)}`,
    },
    {
      name: "Total Winning Balance",
      stat: `${currencyFormat(statsData?.withdrawableBalance)}`,
    },
  ];

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  const nextWinnersPageHandler = (page: any) => {
    setWinnersFilters({
      ...winnersFilters,
      page,
    });
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  useEffect(() => {
    refetchWinners();
  }, [winnersFilters, refetchWinners]);

  const downloadDataHandler = async () => {
    setProcessing(true);
    const allTransactions = await getTransactions({
      isExport: true,
    });
    setProcessing(false);
    const modifiedData = allTransactions?.map((item: any) => ({
      Player: `${item?.user?.firstName} ${item?.user?.lastName}`,
      Email: item?.user?.email,
      "Player ID": item?.user?.playerId,
      "Transaction Type": item?.tag,
      Amount: item?.amount,
      "Balance Before": item?.balanceBefore,
      "Balalnce After": item?.balanceAfter,
      "Transaction ID": item?.reference,
      "Date & Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
      Status: "success",
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Transactions Report-${new Date().toDateString()}`
    );
    setProcessing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={downloadDataHandler}
          title={"Export Transactions"}
          disabled={processing}
          processing={processing}
        />
      </div>

      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(transactions?.data || []).map((transaction: any) => ({
            ...transaction,
            transaction: transaction?.transactionType,
            amount: currencyFormat(transaction?.amount),
            account: transaction?.account,
            date: moment(transaction?.createdAt).format("DD/MM/YYYY hh:mm A"),
            status: "success",
            playerName: `${transaction?.user?.firstName} ${transaction?.user?.lastName}`,
          }))}
          title="Transaction history"
          hideActions={true}
          meta={transactions?.meta}
          subTitle={"These are users that recently transacted"}
          nextPageHandler={nextPageHandler}
          showSearch={true}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="my-10">
        <LottoNowNowTable
          columns={winnerColumns}
          loading={isWinnersLoading}
          data={(winners?.data || []).map((winner: any) => ({
            ...winner,
            amount: currencyFormat(winner?.winningAmount),
            date: moment(winner?.createdAt).format("DD/MM/YYYY hh:mm A"),
            status: "success",
            ticket: `${winner?.ticket?.ticketNumber}`,
            playerName: `${winner?.user?.firstName} ${winner?.user?.lastName}`,
          }))}
          title="Payout Management"
          hideActions={true}
          meta={winners?.meta}
          subTitle={"These are users that recently won"}
          nextPageHandler={nextWinnersPageHandler}
        />
      </div>
    </div>
  );
}

export default Page;
