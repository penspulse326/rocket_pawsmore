import { IconCirclePlus } from "@tabler/icons-react";
import React, { useState } from "react";

import Dot from "@/components/icon/Dot";

const AddRecordBtn: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const category = ["日常紀錄", "醫療紀錄", "重要時刻"];

  const RecordCategoryCard = () => {
    return (
      <ul className="absolute top-[101px] max-w-[164px] p-3 rounded-3xl bg-white shadow-custom">
        {category.map((name, index) => {
          return (
            <li
              className="flex items-center gap-x-[10px] px-3 py-1 rounded-[30px] hover:bg-secondary hover:cursor-pointer"
              key={index}
            >
              <span>新增</span>
              <span className="flex items-center">
                <Dot name={name} size="sm" />
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className="relative flex gap-x-2 justify-center items-center border border-stroke rounded-[30px] w-full min-h-[161px] hover:bg-secondary hover:cursor-pointer"
      onClick={() => setIsShown(!isShown)}
      tabIndex={-1}
    >
      <div className="text-primary">點擊以新增紀錄</div>
      <IconCirclePlus size={24} color={"#203170"} />
      {isShown && <RecordCategoryCard />}
    </div>
  );
};

export default AddRecordBtn;
