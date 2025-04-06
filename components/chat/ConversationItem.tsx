import moment from "moment";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
interface IConversationItem {
  chat: any;
}
const ConversationItem = ({ chat }: IConversationItem) => {
  return (
    <div>
      <div>
        <div className={"flex cursor-pointer items-center  p-2  "}>
          <div className="m-1 h-7 w-7">
            <FaUserAlt size={25} />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md flex justify-between ">
              <div className="text-sm font-medium ">
                {chat?.user?.firstName} {chat?.user?.lastName}
              </div>
              <div className="w-40 truncate text-sm  text-gray-500 dark:text-gray-400">
                {moment(chat?.messages[0]?.createdAt).fromNow()}
              </div>{" "}
            </div>
            <div className="w-40 truncate text-sm  text-gray-500 dark:text-gray-400">
              {chat?.user?.playerId}
            </div>

            <div className="w-40 truncate text-sm mt-5  text-gray-500 dark:text-gray-400">
              {chat?.messages[0]?.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
