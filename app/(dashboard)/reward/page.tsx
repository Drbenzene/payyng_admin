"use client";
import React, { useEffect, useState } from "react";
import { useWinners } from "@/hooks/useWinners";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import { useRouter } from "next/navigation";
import {
  getAllPromoRedeems,
  getAllReferrals,
  usePromo,
} from "@/hooks/usePromo";
import { useAllPromoRedeems, useGetAllReferrals } from "@/hooks/usePromo";
import {
  convertArrayOfObjectsToWorksheet,
  currencyFormat,
} from "@/utils/helperFunc";
import moment from "moment";
import FilterSearchModal from "@/components/modals/FilterModal";

const columns = [
  {
    Header: "Promo Code",
    accessor: "code",
  },
  {
    Header: "Total No. Applied",
    accessor: "appliedTimes",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
  },
  {
    Header: "End Date",
    accessor: "endDate",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const referralColumns = [
  {
    Header: "Referral Code",
    accessor: "referralCode",
  },
  {
    Header: "Referred By",
    accessor: "referredByUser",
  },
  {
    Header: "Player Referred",
    accessor: "referredPlayer",
  },
  {
    Header: "Amount Earned",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Date and Time",
    accessor: "createdAt",
  },
];

function Page() {
  const { push } = useRouter();
  const [filters, setFilters] = useState<any>({});
  const [referralFilters, setWinnersFilters] = useState<any>({});
  const {
    data: promos,
    isLoading: isPromoLoading,
    refetch: refetchPromo,
  } = usePromo(filters);

  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isReferrals, setIsReferrals] = useState(false);

  const { data: allPromoRedeems } = useAllPromoRedeems({});
  const {
    data: allReferrals,
    refetch: refetchReferrals,
    isLoading: isReferralLoading,
  } = useGetAllReferrals(referralFilters);

  const stats = [
    {
      name: "Total Shared Promo Code",
      stat: `${promos?.meta?.totalVolume || 0}`,
    },
    {
      name: "Total Used Referral Code",
      stat: `${allReferrals?.meta?.totalVolume || 0}`,
    },
    {
      name: "Total Used Promo Code",
      stat: `${allPromoRedeems?.meta?.totalVolume || 0}`,
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
      ...referralFilters,
      page,
    });
  };

  useEffect(() => {
    refetchPromo();
  }, [filters, refetchPromo]);

  const downloadDataHandler = async () => {
    if (!isReferrals) {
      await downloadPromoRedeemsHandler();
    } else {
      await downloadReferralsHandler();
    }
    setProcessing(false);
    setOpen(false);
  };

  const downloadReferralsHandler = async () => {
    const res = await getAllReferrals({
      isExport: true,
      ...referralFilters,
    });
    setProcessing(false);
    const modifiedData = res?.map((item: any) => ({
      "Reffered By ": `${item?.referredByUser?.firstName} ${item?.referredByUser?.lastName}`,
      "Referred By Email": item?.referredByUser?.email,
      "Referred By Player ID": item?.referredByUser?.playerId,
      "Referred Player": `${item?.referredPlayer?.firstName} ${item?.referredPlayer?.lastName}`,
      "Referred Player Email": item?.referredPlayer?.email,
      "Referred Player Player ID": item?.referredPlayer?.playerId,
      "Amount Earned": item?.amount,
      "Date and Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
      Status: item?.status,
    }));
    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Referrals Report-${new Date().toDateString()}`
    );
  };

  const downloadPromoRedeemsHandler = async () => {
    const res = await getAllPromoRedeems({
      isExport: true,
      ...filters,
    });
    setProcessing(false);
    const modifiedData = res?.map((item: any) => ({
      "Redeemed Promo": item?.code,
      "Full Name": `${item?.user?.firstName} ${item?.user?.lastName}`,
      "Email Address": item?.user?.email,
      "Player ID": item?.item?.playerId,
      Amount: item?.amount,
      "Date and Time": moment(item?.createdAt).format("DD/MM/YYYY hh:mm A"),
      "Verification Status": item?.isVerified ? "Verified" : "Unverified",
      Status: item?.status,
    }));
    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Promo Redeems Report-${new Date().toDateString()}`
    );
  };

  useEffect(() => {
    refetchReferrals();
  }, [referralFilters, refetchReferrals]);

  const menuOptions = [
    {
      name: "View",
      action: (item: any) => {
        push(`/reward/${item?.id}`);
      },
    },
    {
      name: "Edit",
      action: (item: any) => {
        push(`/reward/add?id=${item?.id}`);
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div></div>
        <div className="flex space-x-5">
          <LottonownoButton
            onClick={() => {
              setIsReferrals(false);
              setOpen(true);
            }}
            title={"Export Promo Rewards"}
            disabled={processing}
            processing={processing}
            bgColor="#1B5E20"
          />

          <LottonownoButton
            onClick={() => {
              setIsReferrals(true);
              setOpen(true);
            }}
            title={"Export Referrals"}
            disabled={processing}
            processing={processing}
            bgColor="#000"
          />
        </div>
      </div>

      <div className="p-7 bg-white flex md:space-y-0  space-y-5 flex-col md:flex-row justify-between items-center">
        <div>
          <p className="font-extrabold text-xl ">Promo Code Creation</p>
          <p className="text-sm text-[#312A50]">
            Set up new promo codes for players to use
          </p>
        </div>

        <LottonownoButton
          onClick={() => push("/reward/add")}
          title={"Add Promo Code +"}
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
          loading={isPromoLoading}
          menuOptions={menuOptions}
          data={(promos?.data || []).map((code: any) => ({
            ...code,
            status:
              code?.status === "active"
                ? "Active"
                : code?.status === "deactivated"
                ? "Deactivated"
                : "Expired",
            amount: `${currencyFormat(code?.amount)}`,
            startDate: `${moment(code?.startDate).format(
              "DD MMM YYYY - hh:mm A"
            )}`,
            endDate: `${moment(code?.endDate).format("DD MMM YYYY - hh:mm A")}`,
          }))}
          title="Promo Code Tracking"
          meta={promos?.meta}
          subTitle={"These are users that recently used the promo code"}
          nextPageHandler={nextPageHandler}
        />
      </div>

      <div className="my-10">
        <LottoNowNowTable
          columns={referralColumns}
          loading={isReferralLoading}
          data={(allReferrals?.data || []).map((referral: any) => ({
            ...referral,
            referredByUser: `${referral?.referredByUser?.firstName} ${referral?.referredByUser?.lastName}`,
            referredPlayer: `${referral?.referredPlayer?.firstName} ${referral?.referredPlayer?.lastName}`,
            amount: currencyFormat(referral?.amount),
            createdAt: moment(referral?.createdAt).format(
              "DD MMM YYYY, hh:mm A"
            ),
          }))}
          title="Referral Code Tracking"
          hideActions={true}
          meta={allReferrals?.meta}
          subTitle={
            "These are users that recently signed up using referral code"
          }
          nextPageHandler={nextWinnersPageHandler}
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
