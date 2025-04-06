"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import ModalLayout from "@/components/modals/ModalLayout";
import { CopyBlock, dracula } from "react-code-blocks";
import BackButton from "@/components/buttons/BackButton";
import { useRequestLogs } from "@/hooks/useRequestLogs";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const { data: requestLogs, refetch, isLoading } = useRequestLogs(filters);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
      </div>
      <p className="font-extrabold text-xl">Security (Request Logs)</p>
      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(requestLogs?.data || []).map((log: any) => ({
            ...log,
            transaction: log?.transactionType,
            amount: currencyFormat(log?.amount),
            date: moment(log?.createdAt).format("DD/MM/YYYY hh:mm A"),
            email: log?.user?.email,
            userName: `${
              log?.user?.firstName
                ? `${log?.user?.firstName} ${log?.user?.lastName}`
                : ""
            } `,
            status: log?.transferStatus,
            reference: log?.transferRef,
          }))}
          title="Security Logs"
          meta={requestLogs?.meta}
          subTitle={
            "These are all request log performed by users on the platform"
          }
          nextPageHandler={nextPageHandler}
          showSearch={true}
          setFilters={setFilters}
          menuOptions={menuItems}
        />
      </div>
      {open && (
        <ModalLayout
          maxWidth="max-w-md"
          open={open}
          setOpen={setOpen}
          title={"Request Details"}
        >
          <div className="grid grid-cols-2 gap-4 mt-5 min-w-full w-full">
            <div>
              <p className="font-semibold">IP Address</p>
              <p>{selectedLog?.ipAddress}</p>
            </div>
            <div>
              <p className="font-semibold">Role</p>
              <p>{selectedLog?.role}</p>
            </div>
            <div>
              <p className="font-semibold">Date and Time</p>
              <p>
                {moment(selectedLog?.createdAt).format("DD/MM/YYYY hh:mm A")}
              </p>
            </div>
            <div>
              <p className="font-semibold">Full Name</p>
              <p>{`${selectedLog?.userName}`}</p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p>{selectedLog?.email}</p>
            </div>
          </div>

          {selectedLog?.requestPath && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Request Path</p>
              <div className="w-full overflow-auto">
                <CopyBlock
                  text={selectedLog?.requestPath}
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

          {selectedLog?.requestBody && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Request Body</p>
              <div className="w-full overflow-auto">
                <CopyBlock
                  text={selectedLog?.requestBody}
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

          {selectedLog?.requestParam && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Request Params</p>
              <div className="w-full overflow-auto">
                <CopyBlock
                  text={selectedLog?.requestParam}
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

          {selectedLog?.requestQuery && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Request Query</p>
              <div className="w-full  overflow-auto">
                <CopyBlock
                  text={selectedLog?.requestQuery}
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
    </div>
  );
}

export default Page;

const columns = [
  {
    Header: "IP Address",
    accessor: "ipAddress",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "User",
    accessor: "userName",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Request Path",
    accessor: "requestPath",
  },
  {
    Header: "Date and Time",
    accessor: "date",
  },
];
