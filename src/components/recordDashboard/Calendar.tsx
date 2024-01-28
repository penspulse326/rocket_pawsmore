import moment from "moment";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { useState } from "react";

const Calendar = () => {
  const Header = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [isExpanded, setIsExpanded] = useState(false);
    const category: string[] = ["日常紀錄", "醫療紀錄", "重要時刻"];
    return (
      <div className="flex justify-between h-[34px]">
        <div className="flex gap-x-8 items-center">
          {/* date */}
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
          {/* switcher */}
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
              onClick={() =>
                setCurrentDate(currentDate.clone().add(1, "month"))
              }
            />
          </div>
        </div>
        {/* select category */}
        <div
          className="relative flex gap-x-1 items-center border border-stroke px-4 py-1 rounded-[300px] hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          onBlur={() => setIsExpanded(false)}
          tabIndex={-1}
        >
          <div>紀錄類型</div>
          <IconChevronDown size={24} />
          {isExpanded && (
            <ul className="absolute top-10 left-0.5 bg-white rounded-3xl p-2 w-[124px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
              {category.map((item, index) => {
                return (
                  <li
                    className="text-center px-3 py-1 rounded-3xl hover:cursor-pointer hover:bg-secondary"
                    key={index}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {/* sample */}
        <select
          name="selection"
          className="appearance-none border border-stroke pl-4 py-1 pr-11 rounded-full bg-[url('/test/select-arrow.svg')] bg-no-repeat bg-right"
        >
          <option value="record types" disabled selected>
            紀錄類型
          </option>
          <option value="routine records">日常紀錄</option>
          <option value="medical records">醫療紀錄</option>
          <option value="moments">重要時刻</option>
        </select>
      </div>
    );
  };
  const Calendar = () => {
    const today = moment();
    const daysOfWeek: string[] = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    const datesOfMonth: { number: number; date: string }[][] = [
      [
        { number: 31, date: "2023/12/31" },
        { number: 1, date: "2024/01/01" },
        { number: 2, date: "2024/01/02" },
        { number: 3, date: "2024/01/03" },
        { number: 4, date: "2024/01/04" },
        { number: 5, date: "2024/01/05" },
        { number: 6, date: "2024/01/06" },
      ],
      [
        { number: 7, date: "2024/01/07" },
        { number: 8, date: "2024/01/08" },
        { number: 9, date: "2024/01/09" },
        { number: 10, date: "2024/01/10" },
        { number: 11, date: "2024/01/11" },
        { number: 12, date: "2024/01/12" },
        { number: 13, date: "2024/01/13" },
      ],
      [
        { number: 14, date: "2024/01/14" },
        { number: 15, date: "2024/01/15" },
        { number: 16, date: "2024/01/16" },
        { number: 17, date: "2024/01/17" },
        { number: 18, date: "2024/01/18" },
        { number: 19, date: "2024/01/19" },
        { number: 20, date: "2024/01/20" },
      ],
      [
        { number: 21, date: "2024/01/21" },
        { number: 22, date: "2024/01/22" },
        { number: 23, date: "2024/01/23" },
        { number: 24, date: "2024/01/24" },
        { number: 25, date: "2024/01/25" },
        { number: 26, date: "2024/01/26" },
        { number: 27, date: "2024/01/27" },
      ],
      [
        { number: 28, date: "2024/01/28" },
        { number: 29, date: "2024/01/29" },
        { number: 30, date: "2024/01/30" },
        { number: 31, date: "2024/01/31" },
        { number: 1, date: "2024/02/01" },
        { number: 2, date: "2024/02/02" },
        { number: 3, date: "2024/02/03" },
      ],
      [
        { number: 4, date: "2024/02/04" },
        { number: 5, date: "2024/02/05" },
        { number: 6, date: "2024/02/06" },
        { number: 7, date: "2024/02/07" },
        { number: 8, date: "2024/02/08" },
        { number: 9, date: "2024/02/09" },
        { number: 10, date: "2024/02/10" },
      ],
    ];
    const allDates: React.ReactNode[] = [];

    const isToday = (prop: string) => {
      return today.format("YYYYMMDD") === moment(prop).format("YYYYMMDD");
    };

    const isCurrentMonth = (prop: string) => {
      return today.format("YYYYMM") === moment(prop).format("YYYYMM");
    };

    return (
      <div className="flex flex-col gap-y-4 font-['Futura'] border border-stroke rounded-[30px] p-8 max-h-[789px] min-h-[789px]">
        {/* header: days of week */}
        <ul className="flex gap-x-4 justify-between text-center font-medium">
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
        {/* body: dates of month */}
        <div className="flex flex-col gap-4">
          {datesOfMonth.map((week, weekIndex) => {
            // 7 days of each weeks
            const everyWeek = week.map((day, dayIndex) => (
              // container of every days
              <div
                className="flex flex-col flex-1 h-[100px]"
                key={`${dayIndex}-${day.date}`}
              >
                {/* top bar */}
                <div
                  className={`h-1 ${
                    isCurrentMonth(day.date) ? "bg-stroke" : ""
                  } 
                   ${isToday(day.date) && "bg-secondary"}`}
                ></div>
                {/* day block */}
                <span
                  className={`w-[35px] h-5 ml-1 mt-1 px-2 py-1 flex justify-center items-center self-start hover:cursor-pointer
                  ${isCurrentMonth(day.date) || "text-[#CCCCCC]"}
                  ${isToday(day.date) && "bg-secondary rounded-[30px]"}`}
                >
                  {day.number === 0 ? "" : day.number}
                </span>
                {/* events block */}
                {/* <ul className="grow">123</ul> */}
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
  return (
    <section className="flex flex-col gap-y-8 mt-8 max-w-[832px]">
      <Header />
      <Calendar />
    </section>
  );
};

export default Calendar;
