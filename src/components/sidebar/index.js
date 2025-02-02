import React from "react";
import s from "./style.module.css";
import CreateChat from "../create-chat";
const Sidebar = ({ setAddChat, chats, addChat, createChat, chooseChat }) => {
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <h2 className={s.title}>Чаты</h2>
        <button className={s.add} onClick={() => setAddChat(true)}>
          Добавить чат
        </button>
      </div>

      <div className={s.list}>
        {chats.map((i) => {
          return (
            <div key={i} onClick={() => chooseChat(i)} className={s.chat}>
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
