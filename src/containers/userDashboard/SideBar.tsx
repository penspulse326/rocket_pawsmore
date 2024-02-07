import React, { useState, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";

const SideBar: React.FC<{ prop: string }> = ({ prop }) => {
  const [openUser, setOpenUser] = useState(false);
  const [openPets, setOpenPets] = useState(false);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    switch (prop) {
      case "user":
        setOpenUser(true);
        setIsActive("帳號資料");
        break;
      case "pets":
        setOpenPets(true);
        setIsActive("寵物檔案清單");
        break;
      default:
        break;
    }
  }, [prop]);

  return (
    <div className="max-w-[248px] w-full flex flex-col gap-y-8 pt-8 pl-8">
      <div className="font-normal text-2xl">設定</div>
      <div className="flex flex-col gap-y-4 self-start">
        {/* user */}
        <div className="flex flex-col gap-y-2">
          <button
            className={`flex items-center gap-x-2 px-4 py-2 rounded-[30px]
          ${
            openUser
              ? "bg-primary border border-primary"
              : "border border-stroke"
          }
          `}
            type="button"
            onClick={() => setOpenUser(!openUser)}
          >
            <span className={`${openUser ? "text-white" : "text-black"}`}>
              個人帳號資料
            </span>
            <IconChevronDown
              size={24}
              color={`${openUser ? "#FFFFFF" : "#000000"}`}
              className={`${
                !openUser && "rotate-180"
              } duration-300 hover:cursor-pointer`}
            />
          </button>
          {openUser && (
            <div className="flex flex-col pl-3 self-start pb-4">
              <div
                className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === "帳號資料" && "font-bold"}
              `}
                onClick={() => setIsActive("帳號資料")}
              >
                帳號資料
              </div>
              <div
                className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === "個人檔案" && "font-bold"}
              `}
                onClick={() => setIsActive("個人檔案")}
              >
                個人檔案
              </div>
            </div>
          )}
        </div>
        {/* pets */}
        <div className="flex flex-col gap-y-2">
          <button
            className={`flex items-center gap-x-2 px-4 py-2 rounded-[30px]
          ${
            openPets
              ? "bg-primary border border-primary"
              : "border border-stroke"
          }
          `}
            type="button"
            onClick={() => setOpenPets(!openPets)}
          >
            <span className={`${openPets ? "text-white" : "text-black"}`}>
              寵物帳號資料
            </span>
            <IconChevronDown
              size={24}
              color={`${openPets ? "#FFFFFF" : "#000000"}`}
              className={`${
                !openPets && "rotate-180"
              } duration-300 hover:cursor-pointer`}
            />
          </button>
          {openPets && (
            <div className="flex flex-col pl-3 self-start">
              <div
                className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === "寵物檔案清單" && "font-bold"}
              `}
                onClick={() => setIsActive("寵物檔案清單")}
              >
                寵物檔案清單
              </div>
              <div
                className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === "新增寵物清單" && "font-bold"}
              `}
                onClick={() => setIsActive("新增寵物清單")}
              >
                新增寵物檔案
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
