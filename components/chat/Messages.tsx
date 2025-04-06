import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import moment from "moment";
import Image from "next/image";
import { replyMessage } from "@/hooks/useSupport";
import { useSupport } from "@/hooks/useSupport";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
const Messages = ({ conversation, setConversation }: any) => {
  const { refetch } = useSupport({});
  const { push } = useRouter();

  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const sendNewMessage = async () => {
    if (!conversation) return;
    if (!message) return;
    const newMessage = {
      sender: "support",
      message: message,
    };

    // Update conversation chat array with the new message for instant UI feedback
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
    };
    setConversation(updatedConversation);
    const payload = {
      supportId: conversation.id,
      message: message,
    };
    setProcessing(true);
    const res = await replyMessage(payload);
    setProcessing(false);
    if (res) {
      refetch();
      setMessage("");
    }
    setProcessing(false);
  };

  return (
    <>
      {conversation ? (
        <div className="flex h-full  w-full flex-grow flex-col">
          <div className="h-15 w-full rounded-xl flex justify-between items-center rounded-bl-none rounded-br-none bg-white p-1 shadow-md dark:bg-gray-800">
            <div className="flex items-center p-2 align-middle">
              <div
                onClick={() => setConversation(null)}
                className="mr-1 rounded-full p-2 text-white hover:primary md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <div className="p-1/2 rounded-full border border-black">
                {conversation?.user?.profileImage ? (
                  <Image
                    src={conversation?.user?.profileImage}
                    width={50}
                    height={50}
                    alt="profile-image"
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle size={50} color="#000" />
                )}
              </div>
              <div className="flex-grow p-2">
                <div className="text-md font-semibold ">
                  {`${conversation?.user?.firstName} ${conversation?.user?.firstName}`}
                  {` - ${conversation?.user?.playerId}`}
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-300"></div>
                  <div className="ml-1 text-xs ">Online</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-2 items-center">
              <button className="px-5 py-2 text-[#D3790D] flex justify-center items-center space-x-2 rounded-md bg-[#FFF7F1]">
                <span>
                  <PhoneIcon />
                </span>
                <span>Call</span>
              </button>
              <button className="px-5 py-2 text-black border rounded-md bg-white">
                Archive
              </button>
              <a
                href={`/users/${conversation?.user?.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="px-5 py-2 text-white rounded-md bg-[#D3790D]">
                  View profile
                </button>
              </a>
            </div>
          </div>
          <div className="my-2 w-full flex-grow overflow-y-auto p-2 dark:bg-gray-900">
            {conversation?.messages?.map((item: any, index: number) => (
              <div key={index}>
                {!item?.sender?.includes("support") ? (
                  <div className="flex w-3/4 items-end">
                    <FaUserCircle size={50} color="#000" />
                    <div className=" m-3 w-8 rounded-full" />
                    <div className="mx-3 my-1 rounded-2xl rounded-bl-none bg-[#F2F4F7] p-3 sm:w-3/4 md:w-3/6 ">
                      <div className="text-xs text-black">
                        {conversation?.sender}
                      </div>
                      <div className="text-black ">{item?.message}</div>
                      {/* 
                      {item?.image && (
                        <div className="h-full w-full">
                          <Image
                            height={250}
                            width={250}
                            src={item?.image}
                            alt="chat-image"
                          />
                        </div>
                      )} */}

                      {/* {item?.video && (
                        <div>
                          <ReactPlayer width='300px' url={item?.video} />
                        </div>
                      )} */}
                      {/* {item?.audio && (
                        <audio
                          controls
                          loop
                          src={`https://hervest-users.s3.amazonaws.com/whatsapp_file_1062851822181143`}
                        ></audio>
                      )} */}
                      <div className="text-xs text-gray-400">
                        {moment(item?.created_at).fromNow()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end ">
                    <div className="m-1 flex w-auto items-end rounded-xl rounded-br-none bg-primary sm:w-3/4 md:w-auto dark:bg-gray-800">
                      <div className="p-2">
                        <div className="text-gray-200">{item?.message}</div>

                        {/*                   
                        {item?.image && (
                          <div className="h-full w-full">
                            <Image
                              height={250}
                              width={250}
                              src={item?.image}
                              alt="chat-image"
                            />
                          </div>
                        )} */}
                        <div className="text-xs text-white pt-3">
                          {moment(item?.created_at).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="h-15 rounded-xl rounded-tl-none rounded-tr-none bg-gray-100 p-3 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-2 text-gray-600 dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="search-chat flex flex-grow p-2">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (message.trim()) {
                        sendNewMessage();
                      }
                    }
                  }}
                  className="input flex-grow rounded-l-md bg-gray-100 p-5 text-sm text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Type your message... (Press Enter to send, Shift + Enter for new line)"
                  rows={1}
                  style={{ resize: "none" }} // Disable resize to keep layout consistent
                />
                <button
                  disabled={processing}
                  className="ml-5 flex items-center justify-center rounded-r-md bg-gray-100 pr-3 text-gray-400 dark:bg-gray-800 dark:text-gray-200"
                  onClick={sendNewMessage}
                >
                  <BsFillSendArrowUpFill color="#B67D08" size={40} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No conversation selected</div>
      )}
    </>
  );
};

export default Messages;
