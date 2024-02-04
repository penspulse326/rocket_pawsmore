import React from "react";
import Image from "next/image";
import { DataType } from "@/common/lib/test/eventData";

const Title = ({ data }: { data: DataType }) => {
  const isReminder: boolean =
    data.card === "醫療紀錄" && data.type === "醫療提醒";

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
          <circle
            cx="3"
            cy="3"
            r="3"
            fill={(() => {
              switch (data.card) {
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
      )}
      <span className="text-2xl font-bold">
        {isReminder ? data.reserve_type : data.card}
      </span>
    </div>
  );
};

export default Title;
