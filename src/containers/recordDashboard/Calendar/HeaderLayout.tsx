import moment from "moment";
import React, { useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";

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

const HeaderLayout = () => {
  const [filterEvent, setFilterEvent] = useState("全部類型");

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

    // helper
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
                    handleEventFilter(item);
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
        <HandleMonth />
      </div>
      <EventFilter />
    </div>
  );
};

export default HeaderLayout;
