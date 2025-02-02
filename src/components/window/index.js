import React, { useState } from "react";
import Input from "../common/Input/input";
import s from "./style.module.css";
import Message from "./message";
const Window = ({ chatId, title, messages, addMessage }) => {
  const [message, setMessage] = useState("");
  if (!chatId) {
    return (
      <div className={s.empty}>
        <span className={s.span}>Выберите или добавьте контакт</span>
      </div>
    );
  }
  return (
    <div className={s.wrap}>
      <div className={s.header}>{title}</div>
      <div className={s.messages}>
        {messages.length ? (
          <>
            {messages.map((i) => {
              return <Message key={i} author={i.author} text={i.text} />;
            })}
          </>
        ) : (
          <span className={s.mes}>Тут пока пусто</span>
        )}
      </div>
      <div className={s.send}>
        <Input w={800} mb={0} value={message} onChange={setMessage} />
        <button
          disabled={!message ? true : false}
          className={s.btn}
          onClick={() => {
            addMessage(message);
            setMessage("");
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Window;
