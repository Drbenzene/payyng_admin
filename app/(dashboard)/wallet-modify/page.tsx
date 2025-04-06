"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import {
  useAdminWalletModifyLogs,
  getAdminWalletModifyLog,
} from "@/hooks/useAdminWalletModifyLogs";
import FilterSearchModal from "@/components/modals/FilterModal";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const {
    data: walletModifyLogs,
    refetch,
    isLoading,
  } = useAdminWalletModifyLogs(filters);
  const [open, setOpen] = useState(false);
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
    const allLogs = await getAdminWalletModifyLog({
      isExport: true,
      ...filters,
    });
    setProcessing(false);
    const modifiedData = allLogs?.map((item: any) => ({
      "Performed By": `${item?.admin?.firstName} ${item?.admin?.lastName}`,
      "Admin Email": `${item?.admin?.email}`,
      "Full Name": `${item?.user?.firstName} ${item?.user?.lastName}`,
      Email: item?.user?.email,
      Amount: item?.amount,
      "Wallet Type": `${item?.walletType}`,
      "Transaction Type": item?.type,
      "Date and Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Admin Wallet Actions Report-${new Date().toDateString()}`
    );
    setProcessing(false);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={() => setOpen(true)}
          title={"Export Logs"}
          disabled={processing}
          processing={processing}
        />
      </div>
      <p className="font-extrabold text-xl">Admin Wallet Modify Logs</p>
      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(walletModifyLogs?.data || []).map((log: any) => ({
            ...log,
            transaction: log?.transactionType,
            amount: currencyFormat(log?.amount),
            date: moment(log?.createdAt).format("DD/MM/YYYY hh:mm A"),
            email: log?.user?.email,
            userName: `${log?.user?.firstName} ${log?.user?.lastName}`,
            status: "success",
            adminName: `${log?.admin?.firstName} ${log?.admin?.lastName}`,
            adminEmail: `${log?.admin?.email}`,
          }))}
          title="Wallet Modify Logs"
          meta={walletModifyLogs?.meta}
          subTitle={
            "These wallet credit and debit transactions performed by the admin"
          }
          nextPageHandler={nextPageHandler}
          showSearch={true}
          setFilters={setFilters}
          hideActions={true}
        />
      </div>
      {open && (
        <FilterSearchModal
          open={open}
          setOpen={setOpen}
          proceedHandler={downloadDataHandler}
          filters={filters}
          setFilters={setFilters}
          processing={processing}
        />
      )}
    </div>
  );
}

export default Page;

const columns = [
  {
    Header: "Performed By",
    accessor: "adminName",
  },
  {
    Header: "Email",
    accessor: "adminEmail",
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
    Header: "Wallet Type",
    accessor: "walletType",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Customer",
    accessor: "userName",
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
