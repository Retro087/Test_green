import React, { useState } from "react";
import s from "./style.module.css";
import Input from "../common/Input/input";
const CreateChat = ({ createChat, setAddChat }) => {
  const [chatId, setChatId] = useState("");
  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <button onClick={() => setAddChat(false)}>Закрыть</button>
        <Input
          label={"Введите номер телефона"}
          value={chatId}
          onChange={setChatId}
        />
        <button
          disabled={!chatId ? true : false}
          className={s.btn}
          onClick={() => {
            createChat(chatId);
            setAddChat(false);
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default CreateChat;
