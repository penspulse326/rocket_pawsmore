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
    return (
      <div className="border border-stroke rounded-[30px] p-8 max-h-[789px] min-h-[789px]">
        <div>Calendar</div>
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
