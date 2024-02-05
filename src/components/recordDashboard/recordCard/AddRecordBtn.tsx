import React, { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";

const AddRecordBtn: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const category = ["日常紀錄", "醫療紀錄", "重要時刻"];
  const RecordCategoryCard = () => {
    return (
      <div className="absolute top-[101px] bg-white max-w-[164px] p-3 rounded-3xl shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
        {category.map((name, index) => {
          return (
            <ul
              className="flex gap-x-[10px] px-3 py-1 rounded-[30px] hover:bg-secondary hover:cursor-pointer"
              key={index}
            >
              <li>新增</li>
              <ol className="flex gap-x-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    fill={(() => {
                      switch (name) {
                        case "日常紀錄":
                          return "#969AFF";
                        case "醫療紀錄":
                          return "#FF6D80";
                        case "重要時刻":
                          return "#FFA959";
                        default:
                          return "";
                      }
                    })()}
                  />
                </svg>
                <li>{name}</li>
              </ol>
            </ul>
          );
        })}
      </div>
    );
  };
  return (
    <div
      className="relative flex gap-x-2 justify-center items-center border border-stroke rounded-[30px] w-full min-h-[161px] hover:bg-secondary hover:cursor-pointer"
      onClick={() => setIsShown(!isShown)}
      onBlur={() => setIsShown(false)}
      tabIndex={-1}
    >
      <div className="text-primary">點擊以新增紀錄</div>
      <IconCirclePlus size={24} color={"#203170"} />
      {isShown && <RecordCategoryCard />}
    </div>
  );
};

export default AddRecordBtn;
