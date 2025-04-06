"use client";

import React, { useEffect, useState } from "react";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import { useParams } from "next/navigation";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";
import BackButton from "@/components/buttons/BackButton";
import LottoLoader from "@/components/loader/LottoLoader";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
import {
  updatePromoStatus,
  usePromoDetails,
  usePromoRedeem,
} from "@/hooks/usePromo";

const columns = [
  {
    Header: "Player Name",
    accessor: "name",
  },
  {
    Header: "Player ID",
    accessor: "playerId",
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Date and Time Applied",
    accessor: "createdAt",
  },
];

function RewardDetailsPage() {
  const [filters, setFilters] = useState<any>({});

  const { id } = useParams();
  const { data: redeems, refetch: redeemRefetch } = usePromoRedeem(
    id as string,
    filters
  );

  const { data: promoDetails, isLoading: isPromoLoading } = usePromoDetails(
    id as string
  );

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  useEffect(() => {
    redeemRefetch();
  }, [filters, redeemRefetch]);

  return (
    <div>
      <BackButton />

      {isPromoLoading && <LottoLoader />}

      {!isPromoLoading && (
        <>
          <LottoNowNowTable
            data={(redeems?.data || []).map((redeem: any) => ({
              ...redeem,
              amount: currencyFormat(redeem?.amount),
              name: `${redeem?.user?.firstName} ${redeem?.user?.lastName}`,
              playerId: redeem?.user?.playerId,
              email: redeem?.user?.email,
              createdAt: moment(redeem?.createdAt).format(
                "DD MMM YYYY, hh:mm A"
              ),
            }))}
            loading={isPromoLoading}
            columns={columns}
            hideActions={true}
            title={`${promoDetails?.code} - ${promoDetails?.status}`}
            subTitle={`Date created - ${moment(promoDetails?.createdAt).format(
              "DD MMM YYYY, hh:mm A"
            )}`}
            meta={redeems?.meta}
            nextPageHandler={nextPageHandler}
            OptionsComponents={() => <OptionsComponents item={promoDetails} />}
          />
        </>
      )}
    </div>
  );
}

export default RewardDetailsPage;

function OptionsComponents({ item }: any) {
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const { refetch } = usePromoDetails(item?.id);

  const deactivatePromoHandler = async () => {
    let res: any = {};
    const payload = {
      status: item?.status === "active" ? "deactivated" : "active",
    };
    res = await updatePromoStatus(item?.id, payload);

    if (res) {
      setShowSuspendModal(false);
      toast.success(`
      ${item?.status === "active" ? "Deactivated" : "Activated"} successful`);
      refetch();
    }
  };

  return (
    <>
      <div className="w-auto flex justify-start  space-x-4  items-center rounded-lg ">
        <button
          className="px-4 py-2 border rounded-md bg-[#FFF7F5] text-primary"
          onClick={() => {
            setShowSuspendModal(true);
          }}
        >
          {item?.status === "active" ? "Deactivate" : "Activate"}
        </button>
        {/* <button className="px-4 py-2 border rounded-md ">Suspend</button> */}
      </div>

      {
        <ConfirmModal
          open={showSuspendModal}
          setOpen={setShowSuspendModal}
          title={`${item?.status === "active" ? "Deactivate" : "Activate"} ${
            item?.code
          }`}
          message={`Are you sure you want to ${
            item?.status === "active" ? "Deactivate" : "Activate"
          } ${item?.code} promo code?`}
          proceedHandler={deactivatePromoHandler}
        />
      }
    </>
  );
}
