import React, { useState, useEffect } from "react";
import ModalLayout from "./ModalLayout";
import { getUserWithUserId } from "@/hooks/useUser";
import LottoLoader from "../loader/LottoLoader";
import LottonownowTable from "../table/LottonownowTable";
import { currencyFormat } from "@/utils/helperFunc";

interface IFullGameDetails {
  open: boolean;
  setOpen: any;
  game: any;
}

const columns = [
  {
    Header: "Ticket No.",
    accessor: "ticketNumber",
  },
  {
    Header: "Name",
    accessor: "fullName",
  },
  {
    Header: "Player ID",
    accessor: "playerId",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Staked Numbers",
    accessor: "stakedNumbers",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const winnersColumns = [
  {
    Header: "Name",
    accessor: "fullName",
  },
  {
    Header: "Player ID",
    accessor: "playerId",
  },
  {
    Header: "Ticket ID",
    accessor: "winningTicketId",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Amount Won",
    accessor: "amount",
  },

  {
    Header: "Winning Number",
    accessor: "winningNumber",
  },
];

function FullGameDetails({ open, setOpen, game }: IFullGameDetails) {
  const [loading, setLoading] = useState(false);
  const [fullGame, setFullGame] = useState<any>(null);
  //GET THE FULL DETAILS WITH THE CUSTOMER RELATIONSION

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (game?.tickets) {
          const ticketUsers = await Promise.all(
            game.tickets.map(async (ticket: any) => {
              if (!ticket.userId) {
                console.warn("Ticket is missing userId:", ticket);
                return { ...ticket, user: null }; // Fallback for missing userId
              }
              const user = await getUserWithUserId(ticket.userId);
              return { ...ticket, user };
            })
          );
          const winnerUsers = await Promise.all(
            game.winners.map(async (winner: any) => {
              if (!winner.userId) {
                console.warn("Winner is missing userId:", winner);
                return { ...winner, user: null }; // Fallback for missing userId
              }
              const user = await getUserWithUserId(winner.userId);
              return { ...winner, user };
            })
          );
          setFullGame({
            ...game,
            tickets: ticketUsers,
            winners: winnerUsers,
          });
        } else {
          console.warn("game.tickets is undefined or empty:", game?.tickets);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Set loading to false when done (whether successful or not)
      }
    };

    fetchData();
  }, [game]); // Add `game` as a dependency to re-run the effect when `game` changes
  console.log(fullGame, "fullGame");

  return (
    <div>
      <ModalLayout
        maxWidth="max-w-4xl"
        open={open}
        setOpen={setOpen}
        title={`${fullGame?.drawType?.name} - ${fullGame?.drawDate}`}
      >
        {loading && <LottoLoader />}

        <div>
          <LottonownowTable
            title={"Game Tickets"}
            subTitle={"These are the tickets played for this games"}
            columns={columns}
            meta={{}}
            data={(fullGame?.tickets || []).map((item: any) => ({
              ...item,
              fullName: `${item?.user?.firstName} ${item?.user?.lastName}`,
              playerId: item?.user?.playerId,
              email: item?.user?.email,
              amount: currencyFormat(item?.amount),
              stakedNumbers: game?.drawNumberSelections
                ?.filter((number: any) => number.ticketId === item?.id)
                .map((item: any) => item.selectedNumber)
                .join(", "),
            }))}
            loading={loading}
            hideActions={true}
          />
        </div>

        <div className="mt-5">
          <LottonownowTable
            title={"Winners"}
            subTitle={"These are the winners for this game"}
            columns={winnersColumns}
            meta={{}}
            data={(fullGame?.winners || []).map((item: any) => ({
              ...item,
              firstName: item?.user?.firstName,
              lastName: item?.user?.lastName,
              email: item?.user?.email,
              fullName: `${item?.user?.firstName} ${item?.user?.lastName}`,
              amount: currencyFormat(item?.winningAmount),
              playerId: item?.user?.playerId,
            }))}
            loading={loading}
            hideActions={true}
          />
        </div>
      </ModalLayout>
    </div>
  );
}

export default FullGameDetails;
