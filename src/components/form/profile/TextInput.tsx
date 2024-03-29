import React, { forwardRef } from "react";
import ErrorMessage from "../../ErrorMessage";

// apply react-hook-form
interface InputPropsType {
  name: string;
  title: string;
  placeholder: string;
  maxLength?: number;
  message?: string;
  value?: string;
  onChange: () => void;
  onBlur: () => void;
  star?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      name,
      title,
      placeholder,
      value,
      maxLength,
      message,
      onChange,
      onBlur,
      star,
    },
    ref
  ) => {
    const borderStyle = message ? { border: "1px solid #F23030" } : {};

    return (
      <div className="flex flex-col gap-1 w-full">
        <h4 className="flex justify-between items-center">
          <span>
            {title}
            {star && <span className="text-error">*</span>}
          </span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <input
          type="text"
          ref={ref}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          style={borderStyle}
          className="p-3 w-full outline-0 border border-stroke rounded-[10px] focus:border-note"
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
