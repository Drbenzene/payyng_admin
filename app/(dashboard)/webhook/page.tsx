"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import ModalLayout from "@/components/modals/ModalLayout";
import { CopyBlock, dracula } from "react-code-blocks";
import { useWebhook } from "@/hooks/useWebhook";
import BackButton from "@/components/buttons/BackButton";

function Page() {
  const [filters, setFilters] = useState<any>({});
  const { data: webhookLogs, refetch, isLoading } = useWebhook(filters);
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
      <BackButton />
      <p className="font-extrabold text-xl">Webhooks</p>

      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          data={(webhookLogs?.data || []).map((log: any) => ({
            ...log,
            date: moment(log?.createdAt).format("DD/MM/YYYY hh:mm A"),
          }))}
          title="Withdrawal Logs"
          meta={webhookLogs?.meta}
          subTitle={"These are all processed webhook logs for tracking"}
          nextPageHandler={nextPageHandler}
          showSearch={true}
          setFilters={setFilters}
          menuOptions={menuItems}
        />
      </div>

      {open && (
        <ModalLayout open={open} setOpen={setOpen} title={"Webhook Details"}>
          <div className="grid grid-cols-2 gap-4 mt-5 min-w-full w-full">
            <div>
              <p className="font-semibold">Date And Type</p>
              <p>
                {moment(selectedLog?.createdAt).format("DD/MM/YYYY hh:mm A")}
              </p>
            </div>
            <div>
              <p className="font-semibold">Provider</p>
              <p>{selectedLog?.provider}</p>
            </div>
            <div>
              <p className="font-semibold">Event Type</p>
              <p>{selectedLog?.eventType}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p>{selectedLog?.status}</p>
            </div>
          </div>

          {selectedLog?.providerResponse && (
            <div className="min-w-full w-full">
              <p className="font-semibold mb-5">Provider Response</p>
              <div className="w-full h-[400px]">
                <CopyBlock
                  text={selectedLog?.providerResponse}
                  // text={JSON.stringify(selectedLog?.providerResponse)}
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
    Header: "Date and Time",
    accessor: "date",
  },
  { Header: "Provider", accessor: "provider" },
  {
    Header: "Event Type",
    accessor: "eventType",
  },
  {
    Header: "Log Message",
    accessor: "logMessage",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
