import moment from "moment";
import { useState } from "react";
import calendarLogic from "@/common/helpers/calendarLogic";
import EventCard from "./EventCard";

const BodyLayout = () => {
  const today = moment();
  const isToday = (prop: string) => {
    return today.format("YYYYMMDD") === moment(prop).format("YYYYMMDD");
  };
  const isCurrentMonth = (prop: string) => {
    return today.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  const [selectedDate, setSelectedDate] = useState("");

  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const calendarArray: string[][] = calendarLogic();
  const allDates: React.ReactNode[] = [];

  return (
    <div className="flex flex-col gap-y-4">
      {/* header: days of week */}
      <ul className="flex gap-x-4 justify-between text-center font-['Futura'] font-medium">
        {daysOfWeek.map((name, index) => {
          return (
            <li
              className={`${
                name === "Sun" || name === "Sat" ? "text-error" : ""
              } flex-1`}
              key={index}
            >
              {name}
            </li>
          );
        })}
      </ul>
      {/* body: dates of the month */}
      <div className="flex flex-col gap-4">
        {calendarArray.map((week, weekIndex) => {
          // 7 days of each weeks
          const everyWeek = week.map((date, dayIndex) => (
            // container of every days
            <div
              className="flex flex-col flex-1 h-[100px] hover:cursor-pointer"
              onClick={() => {
                setSelectedDate(date);
              }}
              key={`${dayIndex}-${date}`}
            >
              {/* top bar */}
              <div
                className={`h-1 ${isCurrentMonth(date) ? "bg-stroke" : ""}
                 ${isToday(date) && "!bg-secondary"}`}
              ></div>
              {/* day block */}
              <span
                className={`w-[35px] h-5 ml-1 mt-1 px-2 py-1 flex justify-center items-center self-start font-['Futura']
                ${isCurrentMonth(date) || "text-[#CCCCCC]"}
                ${selectedDate === date && "bg-secondary rounded-[30px]"}
                `}
              >
                {moment(date).date()}
              </span>
              {/* events block */}
              <EventCard prop={date} />
            </div>
          ));
          // all weeks of the month
          allDates.push(
            <div className="flex gap-x-4" key={`${weekIndex}-${week}`}>
              {everyWeek}
            </div>
          );
          return null;
        })}
        {allDates}
      </div>
    </div>
  );
};

export default BodyLayout;
