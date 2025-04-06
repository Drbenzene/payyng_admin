"use client";

import React, { useEffect, useState } from "react";
import LottonownowTable from "@/components/table/LottonownowTable";
import { useRouter } from "next/navigation";
import { useGames, deleteGame, useGamesPerformance } from "@/hooks/useGames";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";
import Image from "next/image";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Unique ID",
    accessor: "id",
  },
  {
    Header: "Number Of Stakes",
    accessor: "stakes",
  },
  {
    Header: "Stake Amount",
    accessor: "stakeAmount",
  },

  {
    Header: "Payout Amount",
    accessor: "winning1Amount",
  },
  {
    Header: "Date Added",
    accessor: "createdAt",
  },
];

const gamePerformanceColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Stake Amount",
    accessor: "stakeAmount",
  },
  {
    Header: "Total Draws",
    accessor: "totalDraws",
  },
  {
    Header: "Completed Draws",
    accessor: "completedDraws",
  },
  {
    Header: "Cancelled Draws",
    accessor: "cancelledDraws",
  },
  {
    Header: "Ongoing Draws",
    accessor: "ongoingDraws",
  },
  {
    Header: "Pending Draws",
    accessor: "pendingDraws",
  },
];
const gameType = [
  {
    name: "Default Category",
    id: 1,
    description: "Select from 11 existing game categories and create a game",
    image: "/images/option_1.svg",
    param: "default",
  },
  {
    name: "Custom Category",
    id: 2,
    description: "Select custom and enter a unique game category name",
    image: "/images/option_2.svg",
    param: "custom",
  },
];

function Page() {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [confirmDeativate, setConfirmDeativate] = useState(false);
  const menuOptions = [
    {
      name: "View",
      action: (item: any) => {
        push(`/games/${item?.id} `);
      },
    },
    {
      name: "Edit",
      action: (item: any) => {
        push(
          `/games/add?type=${item?.categoryId ? "default" : "custom"}&id=${
            item?.id
          }`
        );
      },
    },
    {
      name: "Deactivate",
      action: (item: any) => {
        setSelectedGame(item);
        setConfirmDeativate(true);
      },
    },
  ];

  const [filters, setFilters] = useState({});

  console.log(filters, "filters");

  const { push } = useRouter();
  const { data: games, refetch, isLoading } = useGames(filters);
  const { data: gamePerformance, isLoading: performanceLoading } =
    useGamesPerformance({});

  const deleteGameHandler = async () => {
    try {
      const res = await deleteGame(selectedGame?.id);
      toast.success("Game deleted successfully");
      refetch();
      setConfirmDeativate(false);
    } catch (err) {}
  };
  console.log(gamePerformance, "gamePerformance");

  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  return (
    <div>
      <BackButton />

      <section>
        <p className="text-lg font-semibold text-center text-primary-100">
          Game Creation
        </p>
        <p className="text-sm font-normal text-center text-primary-100">
          Choose one of the category below to create a game{" "}
        </p>
      </section>

      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gameType.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-md shadow-md p-5 flex space-x-4 items-center justify-center cursor-pointer"
              onClick={() => push(`/games/add?type=${item.param}`)}
            >
              <Image
                height={100}
                width={100}
                src={item.image}
                alt="game"
                className="w-10 h-10"
              />
              <div>
                <p className="text-lg font-semibold text-primary-100">
                  {item.name}
                </p>
                <p className="text-sm font-normal text-primary-100 text-center">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="my-10">
        <LottonownowTable
          title={"All Games"}
          subTitle={"These are the games that are on the platform"}
          columns={columns}
          data={(
            (games &&
              games?.length > 0 &&
              games?.sort((a: any, b: any) =>
                a?.name?.localeCompare(b?.name)
              )) ||
            []
          ).map((item: any) => ({
            ...item,
            image: item?.imagePath,
            stakeAmount: currencyFormat(item?.stakeAmount),
            stakes: item?.noOfStakes,
            winning1Amount: currencyFormat(item?.winner1Amount),
            createdAt: moment(item?.createdAt).format("Do MMM YYYY"),
          }))}
          loading={isLoading}
          menuOptions={menuOptions}
          showSearch={true}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="my-10">
          <LottonownowTable
            title={"Games Perfomances"}
            subTitle={"These are the performances of the games on the platform"}
            columns={gamePerformanceColumns}
            data={((gamePerformance && gamePerformance?.data) || []).map(
              (item: any) => ({
                ...item,
                stakeAmount: currencyFormat(item?.stakeAmount),
                totalDraws: item?.draws?.length,
                completedDraws: item?.draws?.filter(
                  (draw: any) => draw?.status === "drawn"
                )?.length,
                pendingDraws: item?.draws?.filter(
                  (draw: any) => draw?.status === "Pending"
                )?.length,
                ongoingDraws: item?.draws?.filter(
                  (draw: any) => draw?.status === "ongoing"
                )?.length,
                cancelledDraws: item?.draws?.filter(
                  (draw: any) => draw?.status === "closed"
                )?.length,
              })
            )}
            loading={performanceLoading}
            hideActions={true}
          />
        </div>

        {confirmDeativate && (
          <ConfirmModal
            open={confirmDeativate}
            setOpen={setConfirmDeativate}
            title={"Deactivate Game"}
            proceedHandler={deleteGameHandler}
            message={`Are you sure you want to deactivate this ${selectedGame?.name} game? Deactivated games will no longer be open or visible to users.`}
          />
        )}
      </section>
    </div>
  );
}

export default Page;
