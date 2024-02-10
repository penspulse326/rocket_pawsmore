import React, { forwardRef, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

// apply react-hook-form
interface InputPropsType {
  name: string;
  title: string;
  placeholder: string;
  message?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

const PasswordInpput = forwardRef<HTMLInputElement, InputPropsType>(
  ({ name, title, placeholder, message, onChange, onBlur }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const borderStyle = message ? { border: "1px solid #F23030" } : {};

    return (
      <div className="flex flex-col gap-1">
        <h4 className="flex justify-between items-center">
          <span>{title}</span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <div
          style={borderStyle}
          className="flex p-3 w-full outline-0 border border-stroke rounded-[10px] focus:border-note"
        >
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full outline-none"
          />
          {/* an beautiful eye */}
          {showPassword ? (
            <IconEye
              size={24}
              color={"#808080"}
              className="hover:cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IconEyeClosed
              size={24}
              color={"#808080"}
              className="hover:cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
    );
  }
);

PasswordInpput.displayName = "Input";
export default PasswordInpput;
