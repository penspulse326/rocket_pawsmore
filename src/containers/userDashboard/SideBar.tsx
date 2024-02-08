import React, { useState, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface SideBarPropsType {
  prop: string;
  setTargetPage: (targetPage: string) => void;
}

const SideBar: React.FC<SideBarPropsType> = ({ prop, setTargetPage }) => {
  const [openUser, setOpenUser] = useState(false);
  const [openPets, setOpenPets] = useState(false);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const handleVisitPage = (targetPage: string) => {
      setTargetPage(targetPage);
      setIsActive(targetPage);
    };
    switch (prop) {
      case "user":
        setOpenUser(true);
        handleVisitPage("帳號資料");
        break;
      case "pets":
        setOpenPets(true);
        handleVisitPage("寵物檔案清單");
        break;
      default:
        break;
    }
  }, [prop, setTargetPage]);

  const userItems: string[] = ["帳號資料", "個人檔案"];
  const petItems: string[] = ["寵物檔案清單", "新增寵物檔案"];

  const handleTargetPage = (newTarget: string) => {
    setIsActive(newTarget);
    setTargetPage(newTarget);
  };

  return (
    <div className="max-w-[248px] w-full h-full flex flex-col gap-y-8 pt-8 pl-8 border-r border-stroke fixed">
      <div className="text-2xl">設定</div>
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
              {userItems.map((item, index) => {
                return (
                  <div
                    className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === item && "font-bold"}
              `}
                    onClick={() => handleTargetPage(item)}
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
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
              {petItems.map((item, index) => {
                return (
                  <div
                    className={`px-3 py-1 hover:bg-secondary rounded-[30px] hover:cursor-pointer 
              ${isActive === item && "font-bold"}
              `}
                    onClick={() => handleTargetPage(item)}
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
