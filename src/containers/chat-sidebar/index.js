import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseChat, createChat } from "../../store/chatsSlice/chatsSlice";
import CreateChat from "../../components/create-chat";
import Sidebar from "../../components/sidebar";

const ChatSidebar = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    chats: state.chats.list,
  }));
  const [addChat, setAddChat] = useState(false);
  const callbacks = {
    createChat: useCallback((chatId) => dispatch(createChat(chatId)), []),
    chooseChat: useCallback((chatId) => dispatch(chooseChat(chatId)), []),
  };
  return (
    <Sidebar
      addChat={addChat}
      setAddChat={setAddChat}
      chats={select.chats}
      chooseChat={callbacks.chooseChat}
      createChat={callbacks.createChat}
    />
  );
};

export default ChatSidebar;
