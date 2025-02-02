import React, { useState } from "react";
import s from "./style.module.css";
const Input = ({ w, mb = 35, label, value, onChange }) => {
  const [active, setActive] = useState(false);
  return (
    <div style={{ marginBottom: `${mb}px`, width: w }} className={s.wrap}>
      <label className={active ? s.label_active : s.label}>{label}</label>
      <input
        className={active ? s.input_active : s.input}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
    </div>
  );
};

export default Input;
