import moment from "moment";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import React, { useState } from "react";
import Image from "next/image";

interface DataType {
  card: string;
  created_at: string;
  category?: string;
  content?: string | null;
  type?: string;
  remind_at?: string;
  reserve_type?: string | null;
  reserve_at?: string | null;
  title?: string;
}
const originalDataset: DataType[] = [
  {
    card: "日常紀錄",
    created_at: "2023-12-31",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-03",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-08",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-17",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-30",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/17",
    category: "驚喜",
    content: "撿到乳牙",
  },
  {
    card: "重要時刻",
    created_at: "2024/02/02",
    category: "驚喜",
    content: "生日",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/23",
    category: "行為表現",
    content: "睡到翻肚",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/28",
    category: "社交",
    content: "交到新朋友",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/20",
    category: "社交",
    content: "買新衣",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024/01/25",
    reserve_type: "健檢",
    reserve_at: "2024-01-25",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-01",
    reserve_type: "看診",
    reserve_at: "2024-02-01",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-10",
    reserve_type: "打疫苗",
    reserve_at: "2024-02-10",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    remind_at: "2024-01-17",
    reserve_type: "驅蟲",
    reserve_at: "2024-01-17",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    remind_at: "2024-01-17",
    reserve_type: "洗牙",
    reserve_at: "2024-01-17",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-09",
    type: "就診紀錄",
    title: "六合一疫苗初施",
    remind_at: "2024-01-13",
    reserve_type: null,
    reserve_at: null,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-16",
    type: "就診紀錄",
    title: "回診",
    remind_at: "2024-01-13",
    reserve_type: null,
    reserve_at: null,
  },
];

let eventData = originalDataset;

const Calendar = () => {
  const today = moment();
  const isToday = (prop: string) => {
    return today.format("YYYYMMDD") === moment(prop).format("YYYYMMDD");
  };
  const isCurrentMonth = (prop: string) => {
    return today.format("YYYYMM") === moment(prop).format("YYYYMM");
  };
  const [filterEvent, setFilterEvent] = useState("紀錄類型");

  const Header = () => {
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
    const HandleMonth = () => {
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
      const handleEventFilter = (prop: string) => {
        switch (prop) {
          case "全部類型":
            eventData = originalDataset;
            setFilterEvent(prop);
            break;
          default:
            eventData = originalDataset.filter((event) => event.card === prop);
            setFilterEvent(prop);
            break;
        }
      };
      return (
        <div
          className="relative flex gap-x-1 items-center border border-stroke px-4 py-1 rounded-[300px] hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>{filterEvent}</div>
          <IconChevronDown size={24} />
          {isExpanded && (
            <ul className="absolute top-10 left-0.5 bg-white rounded-3xl p-2 w-[124px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
              {category.map((item, index) => {
                return (
                  <li
                    className="text-center px-3 py-1 rounded-3xl hover:cursor-pointer hover:bg-secondary"
                    key={index}
                    onClick={() => {
                      handleEventFilter(item);
                      setIsExpanded(!isExpanded);
                    }}
                  >
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
          <HandleMonth />
        </div>
        <EventFilter />
      </div>
    );
  };
  const Calendar = () => {
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
                   ${isToday(day.date) && "!bg-secondary"}`}
                ></div>
                {/* day block */}
                <span
                  className={`w-[35px] h-5 ml-1 mt-1 px-2 py-1 flex justify-center items-center self-start font-['Futura'] hover:cursor-pointer
                  ${isCurrentMonth(day.date) || "text-[#CCCCCC]"}
                  ${isToday(day.date) && "bg-secondary rounded-[30px]"}`}
                >
                  {day.number === 0 ? "" : day.number}
                </span>
                {/* events block */}
                <EventCard prop={day.date} />
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
  const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
    const eventTitle = (prop: DataType): string | null => {
      const { card, content, title, type, reserve_type } = prop;
      switch (card) {
        case "日常紀錄":
          return card;
        case "重要時刻":
          return content || null;
        case "醫療紀錄":
          if (type === "醫療提醒") {
            return reserve_type || null;
          } else if (type === "就診紀錄") {
            return title || null;
          }
        default:
          return null;
      }
    };
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
    const filteredEvents = eventData.filter(
      (event) =>
        (event.type !== "醫療提醒" &&
          event.created_at &&
          moment(event.created_at).format("YYYYMMDD") ===
            moment(prop).format("YYYYMMDD")) ||
        (event.type === "醫療提醒" &&
          event.reserve_at &&
          moment(event.reserve_at).format("YYYYMMDD") ===
            moment(prop).format("YYYYMMDD"))
    );
    return (
      <ul>
        {filteredEvents.slice(0, 2).map((event, index) => (
          <ol key={index}>
            <li
              className={`flex gap-x-1 items-center ${
                (event.type !== "醫療提醒" &&
                  isCurrentMonth(event.created_at)) ||
                (event.type === "醫療提醒" &&
                  event.reserve_at &&
                  isCurrentMonth(event.reserve_at))
                  ? ""
                  : "opacity-20"
              }`}
            >
              {event.card === "醫療紀錄" && event.type === "醫療提醒" ? (
                <Image
                  src="/test/icon-exclamation.svg"
                  width={6}
                  height={24}
                  alt="exclamation mark"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    fill={iconFillColor(event.card)}
                  />
                </svg>
              )}
              {eventTitle(event) && eventTitle(event)!.length > 5 ? (
                <>
                  {`${eventTitle(event)!.slice(0, 4)}`}
                  <span className="text-note text-xs">⋯</span>
                </>
              ) : (
                eventTitle(event)
              )}
            </li>
          </ol>
        ))}
        {filteredEvents.length > 2 && (
          <li className="text-note text-xs">
            還有 {filteredEvents.length - 2} 項
          </li>
        )}
      </ul>
    );
  };

  return (
    <section className="flex flex-col gap-y-8 max-w-[832px] border border-stroke rounded-[30px] p-8">
      <Header />
      <Calendar />
    </section>
  );
};

export default Calendar;
