import { IconCirclePlus } from "@tabler/icons-react";
import React, { useState } from "react";

import Dot from "@/components/icon/Dot";
import { CardType } from "@/types/enums";

interface PropsType {
  setFormType: (value: number) => void;
}

const AddRecordBtn: React.FC<PropsType> = ({ setFormType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const category = Object.values(CardType).filter(
    (key) => typeof key === "string"
  ) as (keyof typeof CardType)[];

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  const CategoryList = () => {
    return (
      <ul className="absolute top-[101px] max-w-[164px] p-3 rounded-3xl bg-white shadow-custom">
        {category.map((name, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => setFormType(CardType[name])}
                className="flex items-center gap-x-[10px] px-3 py-1 rounded-[30px] hover:bg-secondary"
              >
                <span>新增</span>
                <span className="flex items-center">
                  <Dot name={name} size="sm" />
                  {name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className="relative flex justify-center items-center border border-stroke rounded-[30px] w-full min-h-[161px] hover:bg-secondary hover:cursor-pointer duration-300"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <div className="flex gap-x-2">
        <div className="text-primary">點擊以新增紀錄</div>
        <IconCirclePlus size={24} color={"#203170"} />
      </div>
      {isMenuOpen && <CategoryList />}
    </div>
  );
};

export default AddRecordBtn;
