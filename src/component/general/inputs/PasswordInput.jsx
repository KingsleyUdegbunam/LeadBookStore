import React from "react";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "./PasswordInput.css";

export const PasswordInput = ({
  id,
  label,
  value,
  ref,
  onChange,
  inputClassName,
  labelClassName,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <label className={labelClassName} htmlFor={id}>
        {label}
        <span className="important">*</span>
      </label>
      <div className="input-wrapper">
        <input
          className={inputClassName}
          placeholder="********"
          ref={ref}
          type={isVisible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
        />

        <button
          className="eye-btn"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <LuEye /> : <LuEyeOff />}
        </button>
      </div>
    </div>
  );
};
