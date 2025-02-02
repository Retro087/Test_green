import React from "react";
import s from "./style.module.css";
const Message = ({ text, author }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: author === "me" ? "end" : "start",
      }}
    >
      <div
        style={{
          backgroundColor: author === "me" ? "rgb(158, 255, 128)" : "#FFF",
        }}
        className={s.wrap}
      >
        <span className={s.text}>{text}</span>
      </div>
    </div>
  );
};

export default Message;
