import moment from "moment";
import React, { useState, useContext } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { CategoryContext } from "../CalendarLayout";

const HeaderLayout = () => {
  const { filterEvent, setFilterEvent } = useContext(CategoryContext);

  const [currentDate, setCurrentDate] = useState(moment());
  const [isExpanded, setIsExpanded] = useState(false);

  const category: string[] = ["全部類型", "日常紀錄", "醫療紀錄", "重要時刻"];

  const CalendarTitle = () => {
    return (
      <ul className="flex gap-x-2 text-2xl font-medium">
        <ol className="flex gap-x-1">
          <li className="font-[Futura]">{currentDate.format("YYYY")}</li>
          <li>年</li>
        </ol>
        <ol className="flex gap-x-1">
          <li className="font-[Futura] text-center w-[30px]">
            {currentDate.format("M")}
          </li>
          <li>月</li>
        </ol>
      </ul>
    );
  };
  const MonthHandler = () => {
    return (
      <div className="flex gap-x-4">
        <IconChevronLeft
          size={24}
          color={"#808080"}
          className="hover:cursor-pointer"
          onClick={() =>
            setCurrentDate(currentDate.clone().subtract(1, "month"))
          }
        />
        <IconChevronRight
          size={24}
          color={"#808080"}
          className="hover:cursor-pointer"
          onClick={() => setCurrentDate(currentDate.clone().add(1, "month"))}
        />
      </div>
    );
  };
  const EventFilter = () => {
    const iconFillColor = (prop: string) => {
      switch (prop) {
        case "日常紀錄":
          return "#969AFF";
        case "重要時刻":
          return "#FFA959";
        case "醫療紀錄":
          return "#FF6D80";
        default:
          return "";
      }
    };
    return (
      <div
        className="relative flex gap-x-1 justify-between items-center w-[158px] border border-stroke px-4 py-1 rounded-[300px] hover:cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>{filterEvent}</div>
        <IconChevronDown size={24} />
        {isExpanded && (
          <ul className="absolute top-10 left-0.5 bg-white rounded-3xl p-2 w-[124px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
            {category.map((item, index) => {
              return (
                <li
                  className="flex items-center gap-x-1 px-3 py-1 rounded-3xl hover:cursor-pointer hover:bg-secondary"
                  key={index}
                  onClick={() => {
                    setFilterEvent(item);
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {item === "全部類型" ? (
                    ""
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                    >
                      <circle cx="3" cy="3" r="3" fill={iconFillColor(item)} />
                    </svg>
                  )}
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };
  return (
    <div
      className="flex justify-between h-[34px]"
      onBlur={() => setIsExpanded(false)}
      tabIndex={-1}
    >
      <div className="flex gap-x-8 items-center">
        <CalendarTitle />
        <MonthHandler />
      </div>
      <EventFilter />
    </div>
  );
};

export default HeaderLayout;
