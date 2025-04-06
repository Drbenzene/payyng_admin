"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import { usePaymentLogs, getPaymentLogs } from "@/hooks/usePaymentLogs";
import ModalLayout from "@/components/modals/ModalLayout";
import { CopyBlock, dracula } from "react-code-blocks";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import FilterSearchModal from "@/components/modals/FilterModal";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const { data: paymentLogs, refetch, isLoading } = usePaymentLogs(filters);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  console.log(filters, "GSGSGSG");

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const menuItems = [
    {
      name: "View Details",
      action: (item: any) => {
        console.log(item, "hehehe");
        setSelectedLog(item);
        setOpen(true);
      },
    },
  ];

  const downloadDataHandler = async () => {
    setProcessing(true);
    const allPayments = await getPaymentLogs({
      isExport: true,
      ...filters,
    });
    setProcessing(false);
    const modifiedData = allPayments?.map((item: any) => ({
      "Full Name": `${item?.user?.firstName} ${item?.user?.lastName}`,
      Email: item?.user?.email,
      "Phone number": item?.user?.phoneNumber,
      "Player ID": item?.user?.playerId,
      Reference: item?.reference,
      Amount: item?.amount,
      "Date and Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
      Status: item?.status,
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Payment Report-${new Date().toDateString()}`
    );
    setProcessing(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={() => setOpenFilters(true)}
          title={"Export Payments"}
          disabled={processing}
          processing={processing}
        />
      </div>
      <p className="font-extrabold text-xl">Payment Logs</p>
      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(paymentLogs?.data || []).map((log: any) => ({
            ...log,
            transaction: log?.transactionType,
            amount: currencyFormat(log?.amount),
            date: moment(log?.createdAt).format("DD/MM/YYYY hh:mm A"),
            email: log?.user?.email,
            userName: `${log?.user?.firstName} ${log?.user?.lastName}`,
          }))}
          title="Payment Logs"
          meta={paymentLogs?.meta}
          subTitle={"These are the customer payment logs"}
          nextPageHandler={nextPageHandler}
          showSearch={true}
          setFilters={setFilters}
          menuOptions={menuItems}
        />
      </div>
      {open && (
        <ModalLayout open={open} setOpen={setOpen} title={"Payment Details"}>
          <div className="grid grid-cols-2 gap-4 mt-5 min-w-full w-full">
            <div>
              <p className="font-semibold">Reference</p>
              <p>{selectedLog?.reference}</p>
            </div>
            <div>
              <p className="font-semibold">Amount</p>
              <p>{selectedLog?.amount}</p>
            </div>
            <div>
              <p className="font-semibold">Date and Time</p>
              <p>
                {moment(selectedLog?.createdAt).format("DD/MM/YYYY hh:mm A")}
              </p>
            </div>
            <div>
              <p className="font-semibold">Customer</p>
              <p>{`${selectedLog?.user?.firstName} ${selectedLog?.user?.lastName}`}</p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p>{selectedLog?.user?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p>{selectedLog?.status}</p>
            </div>
          </div>

          {selectedLog?.paymentResponse && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Payment Response</p>
              <div className="w-full h-[400px] overflow-auto">
                {" "}
                <CopyBlock
                  text={JSON.stringify(selectedLog?.paymentResponse, null, 2)}
                  language="json"
                  showLineNumbers={false}
                  theme={dracula}
                  customStyle={{
                    width: "100%",
                    height: "100%",
                    fontSize: "14px",
                    lineHeight: "20px",
                    overflow: "auto",
                  }}
                  codeBlock
                />
              </div>
            </div>
          )}
        </ModalLayout>
      )}

      {openFilters && (
        <FilterSearchModal
          open={openFilters}
          setOpen={setOpenFilters}
          proceedHandler={downloadDataHandler}
          filters={filters}
          setFilters={setFilters}
          processing={processing}
          selectData={[
            { id: "pending", name: "Pending" },
            { id: "verified", name: "Verified" },
          ]}
        />
      )}
    </div>
  );
}

export default Page;

const columns = [
  {
    Header: "Reference",
    accessor: "reference",
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
