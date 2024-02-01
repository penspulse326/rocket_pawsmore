import React, { useState, useContext } from "react";
import Image from "next/image";
import { IconChevronUp, IconChevronDown, IconEdit } from "@tabler/icons-react";
import { DateContext } from "@/pages/record_dashboard";
import { originalData, DataType } from "@/common/lib/test/eventData";

interface SingleCardPropsType {
  data: DataType;
}

const Card: React.FC = () => {
  const { selectedDate } = useContext(DateContext);

  const SingleCard: React.FC<SingleCardPropsType> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const Title: React.FC = () => {
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

    return (
      <div className="border border-stroke rounded-[30px] px-6 py-4">
        <div className="flex justify-between items-center">
          <Title />
          {isExpanded ? (
            <div className="flex gap-x-2">
              <IconEdit
                size={24}
                color={"#203170"}
                className="hover:cursor-pointer"
                onClick={() => console.log("edit")}
              />
              <IconChevronUp
                size={24}
                color={"#808080"}
                className="hover:cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          ) : (
            <IconChevronDown
              size={24}
              color={"#808080"}
              className="hover:cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
        {isExpanded && <></>}
      </div>
    );
  };

  return (
    <>
      {originalData
        .filter(
          (data) =>
            (data.created_at === selectedDate && data.type !== "醫療提醒") ||
            data.reserve_at === selectedDate
        )
        .map((data, index) => (
          <SingleCard key={index} data={data} />
        ))}
    </>
  );
};

export default Card;
