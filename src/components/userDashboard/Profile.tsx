import React, { useState } from "react";
import Image from "next/image";
import { IconPhoto } from "@tabler/icons-react";
import ErrorMessage from "../ErrorMessage";
import { errorText } from "@/common/lib/messageText";

const Profile: React.FC<{ title: string }> = ({ title }) => {
  const [account, setAccount] = useState("chichi1992126");
  const [username, setUsername] = useState("琪琪");
  const [userInfo, setUserInfo] = useState(
    "喜歡旅遊\n下一站美國\n-\nlove can change the world in a moment"
  );
  const [link, setLink] = useState("https://www.instagram.com/chichi126");

  const rowsOfTextarea: number = userInfo.split("\n").length;

  return (
    <div className="flex flex-col gap-y-8 max-w-[728px]">
      <div className="text-xl">{title}</div>
      {/* card container */}
      <div className="flex flex-col gap-y-12 border border-stroke rounded-[30px] p-8 max-w-[728px]">
        <form className="flex gap-x-12">
          {/* photo */}
          <div className="flex flex-col gap-y-4 max-w-[264px] w-full">
            <div>個人照片</div>
            <Image
              src="/test/user-chichi.png"
              width={168}
              height={168}
              alt="user avatar"
              className="border border-stroke rounded-full mx-auto"
            />
            <button className="flex gap-x-2 mx-auto" type="button">
              <IconPhoto size={24} color={"#203170"} />
              <span className="text-primary">上傳照片</span>
            </button>
          </div>
          {/* user info */}
          <div className="flex flex-col gap-y-4 max-w-[352px] w-full">
            {/* account */}
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label htmlFor="account">
                  用戶帳號<span className="text-error font-semibold">*</span>
                </label>
                <ErrorMessage>{errorText.ACCOUNT_EXIST}</ErrorMessage>
              </div>
              <input
                type="text"
                id="account"
                value={account}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            {/* username */}
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label htmlFor="username">
                  用戶名稱<span className="text-error font-semibold">*</span>
                </label>
                <ErrorMessage>{errorText.USERNAME_REQUIRED}</ErrorMessage>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* info */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="userInfo">個人簡介</label>
              <textarea
                id="userInfo"
                value={userInfo}
                maxLength={150}
                rows={rowsOfTextarea}
                className="border border-stroke rounded-[10px] px-4 py-3 h-auto resize-none"
                onChange={(e) => setUserInfo(e.target.value)}
              />
            </div>
            {/* link */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="link">連結</label>
              <input
                type="text"
                id="link"
                value={link}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
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

export default Profile;
