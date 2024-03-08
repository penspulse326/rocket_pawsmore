import moment from "moment";
import { useContext } from "react";
import calendarLogic from "@/common/helpers/calendarLogic";
import EventCard from "./EventCard";
import { MonthContext } from "../CalendarLayout";
import { DateContext } from "@/pages/record_dashboard";

const BodyLayout = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { monthState } = useContext(MonthContext);

  const today = moment();
  const selectedMonth = moment(monthState);

  const isToday = (prop: string) => {
    return today.format("YYYYMMDD") === moment(prop).format("YYYYMMDD");
  };
  const isCurrentMonth = (prop: string) => {
    return selectedMonth.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const calendarArray: string[][] = calendarLogic(
    moment(monthState).format("YYYY-MM-DD")
  );
  const allDates: React.ReactNode[] = [];

  return (
    <div className="flex flex-col gap-y-2 max-w-[768px]">
      {/* header: days of week */}
      <ul className="flex gap-x-4 items-center text-center font-['Futura'] font-medium h-10">
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
      <div className="flex flex-col gap-4 w-full">
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
                 ${
                   isToday(date) &&
                   "bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]"
                 }`}
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
