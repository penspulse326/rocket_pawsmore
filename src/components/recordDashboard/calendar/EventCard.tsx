import moment from "moment";
import Image from "next/image";
import { useContext } from "react";
import { DataType } from "@/common/lib/test/eventData";
import { CategoryContext } from "../CalendarLayout";
import { MonthContext } from "../CalendarLayout";
import sortData from "@/common/helpers/sortData";
import getIconColor from "@/common/helpers/getIconColor";

const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
  const { monthState } = useContext(MonthContext);
  const { filterEvent } = useContext(CategoryContext);

  const selectedMonth = moment(monthState);

  const isCurrentMonth = (prop: string) => {
    return selectedMonth.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  const sortedData = sortData();
  const eventData = sortedData.filter((event) => {
    if (filterEvent === "全部類型") {
      return sortedData;
    } else {
      return event.card === filterEvent;
    }
  });

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
              (event.type !== "醫療提醒" && isCurrentMonth(event.created_at)) ||
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
                <circle cx="3" cy="3" r="3" fill={getIconColor(event.card)} />
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

export default EventCard;
