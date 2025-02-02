import React, { useState } from "react";
import s from "./style.module.css";
import Input from "../common/Input/input";
const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  return (
    <div className={s.wrap}>
      <Input
        onChange={setIdInstance}
        label={"Ваш idInstance"}
        value={idInstance}
      />
      <Input
        onChange={setApiTokenInstance}
        label={"Ваш apiTokenInstance"}
        value={apiTokenInstance}
      />
      <button
        disabled={!idInstance || !apiTokenInstance ? true : false}
        onClick={() => onAuth({ idInstance, apiTokenInstance })}
        className={s.btn}
      >
        Войти
      </button>
    </div>
  );
};

export default AuthForm;
