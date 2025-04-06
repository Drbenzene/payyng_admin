"use client";

import { use, useEffect, useState } from "react";
import Conversation from "@/components/chat/Conversation";
import Messages from "@/components/chat/Messages";
import { useSupport } from "@/hooks/useSupport";
import * as Yup from "yup";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import { useParams } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";

const Page = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const { data: tickets, refetch } = useSupport(filters);
  const { id } = useParams();
  const [selectedChat, setSelectedChat] = useState<any>(null);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  useEffect(() => {
    if (id) {
      const selected = tickets?.data.find((item: any) => item.id === id);
      setSelectedChat(selected);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <BackButton />

      {/* Sidebar */}
      <div
        className={`${
          selectedChat ? "hidden md:block" : "block"
        } w-full bg-gray-100 p-2 md:w-80 dark:bg-gray-800`}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-3 text-xl font-extrabold text-gray-600 dark:text-gray-200">
            Messages
          </div>

          <div className="search-chat flex p-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFilters({
                    ...filters,
                    search,
                  });
                  setSearch("");
                }
              }}
              className="input w-full rounded-l-md bg-gray-200 p-3 text-sm text-gray-700 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              type="text"
              placeholder="Search Customer Contact"
            />
            <button
              onClick={() => {
                setFilters({
                  ...filters,
                  search,
                });
                setSearch("");
              }}
              className="flex items-center justify-center rounded-r-md bg-gray-200 pr-3 text-gray-400 dark:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* <div className="p-3 text-lg font-semibold text-gray-600 dark:text-gray-200">
            <LottonownoButton
              onClick={() => {
                setNewChat(true);
              }}
              title="START NEW CONVERSATION"
            />
          </div> */}

          <div className="font-semibol p-3 text-lg text-gray-600 dark:text-gray-200">
            Recent
          </div>
          {tickets?.data && (
            <Conversation
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              chats={tickets?.data}
            />
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden"
        } h-screen flex-grow p-2 md:flex`}
      >
        {selectedChat ? (
          <Messages
            setConversation={setSelectedChat}
            conversation={selectedChat}
          />
        ) : (
          <div className="flex w-full items-center justify-center text-gray-600 dark:text-gray-200">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
