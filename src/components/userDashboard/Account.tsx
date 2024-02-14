import React, { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import ErrorMessage from "../ErrorMessage";
import { ChangePassword } from "@/common/lib/formText";
import { errorText } from "@/common/lib/messageText";

const Account: React.FC = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("123456");
  const [newPassword, setNewPassword] = useState("");

  const [toChangePassword, setToChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const ChangePasswordBtn = () => {
    const handleChangePassword = () => {
      setToChangePassword(true);
      setPassword("");
    };

    if (toChangePassword) {
      if (showPassword) {
        return (
          <IconEye
            size={24}
            color={"#808080"}
            className="absolute right-4 hover:cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        );
      } else {
        return (
          <IconEyeClosed
            size={24}
            color={"#808080"}
            className="absolute right-4 hover:cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        );
      }
    } else {
      return (
        <button
          className="absolute right-2 bg-primary text-white rounded-[30px] px-4 py-1.5"
          type="button"
          onClick={handleChangePassword}
        >
          更改
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-8 max-w-[416px]">
      <div className="text-xl">帳號資料</div>
      <div className="flex flex-col gap-y-12 border border-stroke rounded-[30px] p-8">
        <form className="flex flex-col  gap-y-4">
          {/* email */}
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">
              電子郵件<span className="text-error font-semibold">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="px-4 py-3 bg-stroke rounded-[10px]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* password */}
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between">
              <label htmlFor="password">
                密碼<span className="text-error font-semibold">*</span>
              </label>
              <ErrorMessage>{errorText.PASSWORD_INVALID}</ErrorMessage>
            </div>
            <div className="relative flex items-center">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                value={password}
                placeholder={
                  toChangePassword ? ChangePassword.ENTER_PASSWORD : ""
                }
                className="px-4 py-3 border border-stroke rounded-[10px] w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ChangePasswordBtn />
            </div>
          </div>
          {/* check password */}
          {toChangePassword && (
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label htmlFor="checkPassword">
                  確認密碼<span className="text-error font-semibold">*</span>
                </label>
                <ErrorMessage>{errorText.PASSWORD_NOT_MATCH}</ErrorMessage>
              </div>
              <div className="relative flex items-center">
                <input
                  type={`${showNewPassword ? "text" : "password"}`}
                  id="checkPassword"
                  value={newPassword}
                  placeholder={ChangePassword.DOUBLE_CHECK}
                  className="px-4 py-3 border border-stroke rounded-[10px] w-full"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showNewPassword ? (
                  <IconEye
                    size={24}
                    color={"#808080"}
                    className="absolute right-4 hover:cursor-pointer"
                    onClick={() => setShowNewPassword(false)}
                  />
                ) : (
                  <IconEyeClosed
                    size={24}
                    color={"#808080"}
                    className="absolute right-4 hover:cursor-pointer"
                    onClick={() => setShowNewPassword(true)}
                  />
                )}
              </div>
            </div>
          )}
        </form>
        <button
          className="text-white bg-primary rounded-[300px] px-[104px] py-2 self-center"
          type="submit"
        >
          送出
        </button>
      </div>
    </div>
  );
};

export default Account;
