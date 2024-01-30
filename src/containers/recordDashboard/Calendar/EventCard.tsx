import moment from "moment";
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

const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
  const today = moment().clone();
  const isToday = (prop: string) => {
    return today.format("YYYYMMDD") === moment(prop).format("YYYYMMDD");
  };
  const isCurrentMonth = (prop: string) => {
    return today.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

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
                <circle cx="3" cy="3" r="3" fill={iconFillColor(event.card)} />
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
