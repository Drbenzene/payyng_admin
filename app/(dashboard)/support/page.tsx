"use client";
import React, { useEffect, useState } from "react";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import { useRouter } from "next/navigation";
import { resolveTicket, useSupport } from "@/hooks/useSupport";
import StatCard from "@/components/cards/StatCard";
import moment from "moment";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";

const columns = [
  {
    Header: "Ticket ID",
    accessor: "ticketNo",
  },
  {
    Header: "Player Name",
    accessor: "customerName",
  },
  {
    Header: "Ticket Type",
    accessor: "title",
  },
  {
    Header: "Ticket Status",
    accessor: "status",
  },
  {
    Header: "Ticket Date",
    accessor: "date",
  },
];

function Page() {
  const { push } = useRouter();
  const [filters, setFilters] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const { data: allSupports, refetch, isLoading } = useSupport(filters);

  const stats = [
    {
      name: "Total Suport Issues",
      stat: `${allSupports?.meta?.totalVolume || 0}`,
    },
    {
      name: "Total Issue Resolved",
      stat: `${
        allSupports?.data.filter((item: any) => item?.status === "RESOLVED")
          ?.length || 0
      }`,
    },
    {
      name: "Total Unresolved Issues",
      stat: `${
        allSupports?.data.filter((item: any) => item?.status !== "RESOLVED")
          ?.length || 0
      }`,
    },
  ];

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const menuOptions = [
    {
      name: "Reply",
      action: (item: any) => {
        push(`/support/${item?.id}`);
      },
    },
    {
      name: "Resolve Ticket",
      action: (item: any) => {
        setSelectedChat(item);
        setShowModal(true);
      },
    },
  ];

  const resolveTicketHandler = async () => {
    const res = await resolveTicket(selectedChat?.id);
    if (res) {
      toast.success("Ticket resolved successfully");
      setSelectedChat(null);
      setShowModal(false);
      refetch();
    }
  };
  return (
    <div>
      <BackButton />

      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <StatCard key={item?.name} name={item.name} stat={item.stat} />
          ))}
        </dl>
      </div>

      <div className="my-10">
        <LottoNowNowTable
          columns={columns}
          loading={isLoading}
          menuOptions={menuOptions}
          data={(allSupports?.data || []).map((ticket: any) => ({
            ...ticket,
            customerName: `${ticket?.user?.firstName} ${ticket?.user?.lastName}`,
            date: moment(ticket?.createdAt).format("DD MMM YYYY - hh:mm A"),
            status:
              ticket?.status === "PENDING"
                ? "Pending"
                : ticket?.status === "INPROGRESS"
                ? "In Progress"
                : "Resolved",
          }))}
          title="Support Tickets"
          meta={allSupports?.meta}
          subTitle={"These are the support ticket received"}
          nextPageHandler={nextPageHandler}
        />
      </div>

      {showModal && (
        <ConfirmModal
          title="Resolve Ticket"
          setOpen={() => setShowModal(false)}
          proceedHandler={() => {
            resolveTicketHandler();
          }}
          message="Are you sure you want to mark this support ticket as resolved?"
          open={showModal}
        />
      )}
    </div>
  );
}

export default Page;
