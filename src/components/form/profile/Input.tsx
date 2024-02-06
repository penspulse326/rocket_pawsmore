import React, { forwardRef } from "react";
import ErrorMessage from "../../ErrorMessage";

// apply react-hook-form
interface InputPropsType {
  name: string;
  title: string;
  placeholder: string;
  message?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ name, title, placeholder, message, onChange }, ref) => {
    const borderStyle = message ? { border: "1px solid #F23030" } : {};

    return (
      <div className="flex flex-col gap-1">
        <h4 className="flex justify-between items-center">
          <span>{title}</span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          style={borderStyle}
          className="p-3 w-full outline-0 border border-stroke rounded-[10px] focus:border-note"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
