import React from "react";
import ConversationItem from "./ConversationItem";
interface IConversation {
  chats: any;
  setSelectedChat: any;
  selectedChat: any;
}
const Conversation = ({
  chats,
  setSelectedChat,
  selectedChat,
}: IConversation) => {
  return (
    <div className="p-1">
      {chats?.map((item: any, index: any) => (
        <div
          onClick={() => setSelectedChat(item)}
          className={`cursor-pointer  ${
            selectedChat?.id == item?.id && "bg-[#FFF7F1] text-[#D3790D]"
          } m-1 rounded-md p-1`}
          key={index}
        >
          <ConversationItem chat={item} />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
