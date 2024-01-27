import Image from "next/image";
import moment from "moment";

const eventData = [
  {
    card: "重要時刻",
    created_at: "2024/01/17",
    category: "驚喜",
    content: "撿到乳牙",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/23",
    category: "行為表現",
    content: "睡到翻肚",
  },
  {
    card: "重要時刻",
    created_at: "2024/01/23",
    category: "社交",
    content: "交到新朋友",
  },
  {
    card: "醫療紀錄",
    create_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-01-25",
    reserve_type: "健檢",
    reserve_at: "2024-01-25",
  },
  {
    card: "醫療紀錄",
    create_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-01",
    reserve_type: "看診",
    reserve_at: "2024-02-01",
  },
  {
    card: "醫療紀錄",
    create_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-10",
    reserve_type: "打疫苗",
    reserve_at: "2024-02-10",
  },
];

const Upcoming = () => {
  const Reminders = () => {
    return (
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="flex gap-x-1 items-center">
          <Image
            src="/test/icon-exclamation.svg"
            width={6}
            height={24}
            alt="exclamation mark"
          />
          <div>醫療提醒</div>
        </div>
        {eventData
          .filter((event) => event.type === "醫療提醒")
          .map((event, index) => (
            <ul className="flex gap-x-4" key={index}>
              <li className="w-[42px]">
                {moment(event.reserve_at).format("M/D")}
              </li>
              <li>{event.reserve_type}</li>
            </ul>
          ))}
      </div>
    );
  };
  const Moments = () => {
    return (
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="flex gap-x-1 items-center">
          <Image
            src="/test/icon-dot.svg"
            width={6}
            height={24}
            alt="dot symbol"
          />
          <div>重要時刻</div>
        </div>
        {eventData
          .filter((event) => event.card === "重要時刻")
          .map((event, index) => (
            <ul className="flex gap-x-4" key={index}>
              <li className="w-[42px]">
                {moment(event.create_at).format("M/D")}
              </li>
              <li className="flex gap-x-1">
                <span
                  className={`px-2 rounded-[30px] 
                ${(() => {
                  switch (event.category) {
                    case "行為表現":
                      return "bg-[#F9E6FF]";
                    case "驚喜":
                      return "bg-[#FFF5CF]";
                    case "生活習慣":
                      return "bg-[#FFE9EC]";
                    case "社交":
                      return "bg-[#D5F0FF]";
                    case "技能":
                      return "bg-[#E0FFDF]";
                    default:
                      return "";
                  }
                })()}`}
                >
                  {event.category}
                </span>
                {event.content}
              </li>
            </ul>
          ))}
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-y-2">
      <div className="text-note">即將到來</div>
      <div className="flex border border-stroke rounded-[30px] p-8">
        <Reminders />
        <Moments />
      </div>
    </section>
  );
};

export default Upcoming;
