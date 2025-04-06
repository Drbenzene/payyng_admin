"use client";

import React, { useEffect, useState } from "react";
import LottoNowNowTable from "@/components/table/LottonownowTable";
import { useUserTickets } from "@/hooks/useTickets";
import { useTransactions } from "@/hooks/useTransactions";
import {
  suspendUser,
  unsuspendUser,
  useGetUserDetails,
} from "@/hooks/useUsers";
import { useParams } from "next/navigation";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";
import BackButton from "@/components/buttons/BackButton";
import LottoLoader from "@/components/loader/LottoLoader";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
import StatCard from "@/components/cards/StatCard";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import ModalLayout from "@/components/modals/ModalLayout";
import LottoNowNowCurrencyField from "@/components/inputs/LottoNowNowCurrencyField";
import LottoNowNowTextArea from "@/components/inputs/LottoNowNowTextArea";
import SelectInputField from "@/components/inputs/SelectInputField";
import { Formik } from "formik";
import * as Yup from "yup";
import { adminCreditDebitUserWallet } from "@/hooks/useWallet";

const columns = [
  {
    Header: "Game Category",
    accessor: "name",
  },
  {
    Header: "Game ID",
    accessor: "drawId",
  },
  {
    Header: "Ticket",
    accessor: "ticketNumber",
  },
  {
    Header: "Date Played",
    accessor: "datePlayed",
  },
  {
    Header: "Outcome",
    accessor: "status",
  },
  {
    Header: "Winning Number(s)",
    accessor: "winningNumbers",
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Amount Won",
    accessor: "amountWon",
  },
];

const transactionColumns = [
  {
    Header: "Transaction",
    accessor: "tag",
  },
  {
    Header: "Type",
    accessor: "type",
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
    Header: "Balance Before",
    accessor: "balanceBefore",
  },
  {
    Header: "Balance After",
    accessor: "balanceAfter",
  },
  {
    Header: "Reference",
    accessor: "reference",
  },
];

function UserDetailsPage() {
  const [openWalletTopUp, setOpenWalletTopUp] = useState(false);
  const [isCredit, setIsCredit] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [transactionFilters, setTransactionFilters] = useState<any>({
    page: 1,
  });
  const { id } = useParams();
  const {
    data: tickets,
    refetch: ticketRefetch,
    isLoading,
  } = useUserTickets(id as string, filters);
  const { data: userInfo, refetch: refetchUser } = useGetUserDetails(
    id as string
  );
  const { data: transactions, refetch: transactionRefetch } = useTransactions({
    userId: id,
    ...transactionFilters,
  });

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };
  const nextTransactionPageHandler = (page: any) => {
    setTransactionFilters({
      ...transactionFilters,
      page,
    });
  };

  useEffect(() => {
    ticketRefetch();
  }, [filters, ticketRefetch]);

  const walletStats = [
    {
      name: "Total Balance",
      stat: currencyFormat(
        userInfo?.wallet?.withdrawableBalance + userInfo?.wallet?.gameBalance
      ),
    },
    {
      name: "Winning Balance",
      stat: currencyFormat(userInfo?.wallet?.withdrawableBalance || 0),
    },
    {
      name: "Game Balance",
      stat: currencyFormat(userInfo?.wallet?.gameBalance || 0),
    },
  ];

  useEffect(() => {
    transactionRefetch();
  }, [transactionFilters, transactionRefetch]);

  const adminModifyWalletHandler = async (values: any) => {
    const payload = {
      ...values,
      amount: Number(values.amount),
      userId: id,
    };

    const res = await adminCreditDebitUserWallet(payload);
    if (res) {
      setOpenWalletTopUp(false);
      toast.success(
        `${isCredit ? "Credited" : "Debited"} ${userInfo?.firstName} ${
          userInfo?.lastName
        } wallet successful`
      );
      refetchUser();
      transactionRefetch();
    }
  };
  return (
    <div>
      <h1
        className="text-2xl font-semibold text-primary-100"
        style={{ marginBottom: "20px" }}
      >
        {userInfo?.firstName} {userInfo?.lastName} - {userInfo?.playerId}
      </h1>
      <div className="flex justify-between items-center">
        <BackButton />
        <div className="flex space-x-3">
          <LottonownoButton
            onClick={() => {
              setIsCredit(true);
              setOpenWalletTopUp(true);
            }}
            bgColor="#1B5E20"
            title="Credit Wallet"
          />

          <LottonownoButton
            onClick={() => {
              setIsCredit(false);
              setOpenWalletTopUp(true);
            }}
            bgColor="black"
            title="Debit Wallet"
          />
        </div>
      </div>

      {isLoading && <LottoLoader />}

      {!isLoading && (
        <>
          <dl className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {walletStats.map((item) => (
              <StatCard key={item.name} name={item.name} stat={item.stat} />
            ))}
          </dl>

          <LottoNowNowTable
            data={(tickets?.data || []).map((result: any) => ({
              ...result,
              name: result?.draw?.drawType?.name,
              position: result?.status === "won" ? "1st" : "None",
              stakeAmount: currencyFormat(result?.drawType?.stakeAmount),
              datePlayed: moment(result?.draw?.drawDate).format("DD/MM/YYYY"),
              amountWon: `${
                `${currencyFormat(
                  result?.winners?.find((winner: any) => winner?.userId === id)
                    ?.winningAmount
                )}` || `0.00`
              }`,
              winningNumbers: result?.winners
                ?.map((winner: any) => winner?.winningNumber)
                .join(", "),
            }))}
            loading={isLoading}
            columns={columns}
            hideActions={true}
            showSearch={true}
            title={`${userInfo?.firstName} ${userInfo?.lastName}`}
            subTitle={`${userInfo?.email}  - ${moment(
              userInfo?.createdAt
            ).format("DD MMM YYYY, hh:mm")}`}
            meta={tickets?.meta}
            nextPageHandler={nextPageHandler}
            filters={filters}
            setFilters={setFilters}
            OptionsComponents={() => <OptionsComponents item={userInfo} />}
          />

          <div className="my-10">
            <LottoNowNowTable
              columns={transactionColumns}
              loading={isLoading}
              data={(transactions?.data || []).map((transaction: any) => ({
                ...transaction,
                transaction: transaction?.transactionType,
                amount: currencyFormat(transaction?.amount),
                balanceAfter: currencyFormat(transaction?.balanceAfter),
                balanceBefore: currencyFormat(transaction?.balanceBefore),
                account: transaction?.account,
                date: moment(transaction?.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                ),
              }))}
              title="Transaction history"
              hideActions={true}
              meta={transactions?.meta}
              showSearch={true}
              subTitle={""}
              nextPageHandler={nextTransactionPageHandler}
              filters={transactionFilters}
              setFilters={setTransactionFilters}
            />
          </div>

          {openWalletTopUp && (
            <ModalLayout
              open={openWalletTopUp}
              setOpen={() => setOpenWalletTopUp(!openWalletTopUp)}
              title={isCredit ? `Credit Wallet` : "Debit Wallet"}
              maxWidth="max-w-md"
            >
              <Formik
                initialValues={{
                  amount: "",
                  description: "",
                  type: isCredit ? "CREDIT" : "DEBIT",
                  walletType: "game",
                }}
                validationSchema={Yup.object().shape({
                  amount: Yup.number().required("Amount is required"),
                  description: Yup.string().required("Description is required"),
                  type: Yup.string().required("Type is required"),
                  walletType: Yup.string()
                    .required("Wallet Type is required")
                    .min(1, "Wallet Type is required"),
                })}
                onSubmit={async (values: any, { setSubmitting }) => {
                  await adminModifyWalletHandler(values);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                  setValues,
                  isSubmitting,
                  isValid,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-5"
                  >
                    <LottoNowNowCurrencyField
                      label="Amount"
                      name="amount"
                      value={values.amount}
                      error={errors.amount}
                      placeholder={"0.00"}
                      touched={touched.amount}
                      id={"amount"}
                      setValues={setValues}
                      values={values}
                    />

                    <SelectInputField
                      label="Choose Wallet Type"
                      name="walletType"
                      value={values.walletType}
                      onChange={(e: any) => {
                        setValues({
                          ...values,
                          walletType: e.target.value,
                        });
                        if (isCredit && e.target.value === "WINNING") {
                          toast.info(
                            `Winning balance is not allowed for crediting`
                          );
                          setOpenWalletTopUp(false);
                        }
                      }}
                      onBlur={handleBlur}
                      error={errors.walletType}
                      data={[
                        { name: "Choose Wallet", value: "" },
                        { name: "Game", value: "GAME" },
                        { name: "Winning (Withdrawable)", value: "WINNING" },
                      ]}
                    />

                    <LottoNowNowTextArea
                      label="Description"
                      name="description"
                      placeholder={`Enter description for ${
                        isCredit ? "credit" : "debit"
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      error={errors.description}
                      required={true}
                    />

                    <div>
                      <LottonownoButton
                        onClick={() => handleSubmit()}
                        title={`${
                          isCredit ? "Credit" : "Debit"
                        } Wallet with ${currencyFormat(values.amount)}`}
                        processing={isSubmitting}
                        disabled={!isValid || isSubmitting}
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </ModalLayout>
          )}
        </>
      )}
    </div>
  );
}

export default UserDetailsPage;

function OptionsComponents({ item }: any) {
  const { refetch } = useGetUserDetails(item?.id);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const suspendUserHandler = async () => {
    let res: any;
    if (item?.status === "SUSPENDED") {
      res = await unsuspendUser(item?.id);
    } else {
      res = await suspendUser(item?.id);
    }

    if (res) {
      setShowSuspendModal(false);
      toast.success(`
      ${item?.status === "SUSPENDED" ? "Unsuspend" : "Suspended"} ${
        item?.firstName
      } ${item?.lastName} successful`);
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
          {item?.status === "SUSPENDED" ? "Unsuspend" : "Suspend"}
        </button>
        {/* <button className="px-4 py-2 border rounded-md ">Suspend</button> */}
      </div>

      {
        <ConfirmModal
          open={showSuspendModal}
          setOpen={setShowSuspendModal}
          title={`${item?.status === "SUSPENDED" ? "Unsuspend" : "Suspend"} ${
            item?.firstName
          } ${item?.lastName}`}
          message={`Are you sure you want to ${
            item?.status === "SUSPENDED" ? "unsuspend" : "suspend"
          } ${item?.firstName} ${item?.lastName}?`}
          proceedHandler={suspendUserHandler}
        />
      }
    </>
  );
}
