import React, { useCallback, useEffect, useState } from "react";
import Window from "../../components/window";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseChat,
  clearMessages,
  createChat,
  fetchNotifications,
  sendMessage,
} from "../../store/chatsSlice/chatsSlice";
import ChatSidebar from "../chat-sidebar";
import ChatLayout from "../../components/layouts/chat-layout";
import CreateChat from "../../components/create-chat";
import Sidebar from "../../components/sidebar";

const Chat = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    messages: state.chats.messages,
    chatId: state.chats.chatId,
    idInstance: state.auth.idInstance,
    apiTokenInstance: state.auth.apiTokenInstance,
    chats: state.chats.list,
  }));
  const [addChat, setAddChat] = useState(false);
  const callbacks = {
    addMessage: useCallback((message) =>
      dispatch(
        sendMessage({
          idInstance: select.idInstance,
          apiTokenInstance: select.apiTokenInstance,
          chatId: select.chatId,
          message: message,
        })
      )
    ),
    createChat: useCallback((chatId) => dispatch(createChat(chatId)), []),
    chooseChat: useCallback((chatId) => dispatch(chooseChat(chatId)), []),
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, [select.chatId]);

  useEffect(() => {
    if (select.chatId) {
      const fetch = async () => {
        dispatch(
          fetchNotifications({
            idInstance: select.idInstance,
            apiTokenInstance: select.apiTokenInstance,
          })
        );
      };
      fetch();
      const intervalId = setInterval(() => {
        dispatch(
          fetchNotifications({
            idInstance: select.idInstance,
            apiTokenInstance: select.apiTokenInstance,
          })
        );
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [select.chatId, select.idInstance, select.apiTokenInstance]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        createChat={callbacks.createChat}
        chooseChat={callbacks.chooseChat}
        chats={select.chats}
        setAddChat={setAddChat}
        addChat={addChat}
      />
      <Window
        addMessage={callbacks.addMessage}
        messages={select.messages}
        title={select.chatId}
        chatId={select.chatId}
      />
      {addChat ? (
        <CreateChat createChat={callbacks.createChat} setAddChat={setAddChat} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Chat;
