import React, { useContext } from "react";
import Image from "next/image";
import getIconColor from "@/common/helpers/getIconColor";
import { DataContext } from "../SingleCardLayout";

const Title: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { card, type, reserve_type } = data;
  const isReminder: boolean = card === "醫療紀錄" && type === "醫療提醒";

  return (
    <div className="flex gap-x-4 items-center h-9">
      {isReminder ? (
        <Image
          src="/test/icon-exclamation.svg"
          width={9}
          height={36}
          alt="exclamation symbol"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill={getIconColor(card)} />
        </svg>
      )}
      <span className="text-2xl font-bold">
        {isReminder ? reserve_type : card}
      </span>
    </div>
  );
};

export default Title;