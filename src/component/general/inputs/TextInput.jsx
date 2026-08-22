import React from "react";

export const TextInput = ({
  id,
  name,
  label,
  important,
  ref,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  disabled,
  required,
}) => {
  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
          {important && <span className="important">*</span>}
        </label>
        <input
          required={required}
          placeholder={placeholder}
          ref={ref}
          id={id}
          name={name}
          type="text"
          disabled={disabled}
          aria-disabled={disabled}
          readOnly={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};
