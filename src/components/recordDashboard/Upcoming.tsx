import Image from "next/image";
import moment from "moment";
import { originalData } from "@/common/lib/test/eventData";

const Upcoming = () => {
  const Reminders = () => {
    const eventData = originalData
      // 篩選即將到來事件
      .filter(
        (event) =>
          event.type === "醫療提醒" &&
          event.reserve_at &&
          moment(event.reserve_at).isAfter(moment())
      )
      // 由日期近到遠進行排列
      .sort((a, b) => moment(a.reserve_at).diff(b.reserve_at))
      // 只顯示前三筆
      .slice(0, 3);

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
        {eventData.map((event, index) => (
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
    const eventData = originalData
      // 篩選即將到來事件
      .filter(
        (event) =>
          event.card === "重要時刻" &&
          event.created_at &&
          moment(event.created_at).isAfter(moment())
      )
      // 由日期近到遠進行排列
      .sort((a, b) => moment(a.created_at).diff(b.created_at))
      // 只顯示前三筆
      .slice(0, 3);

    return (
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="flex gap-x-1 items-center">
          <Image
            src="/test/icon-flag.svg"
            width={24}
            height={24}
            alt="flag icon"
          />
          <div>紀念日</div>
        </div>
        <ul className="flex gap-x-4">
          <li className="w-[42px]">2/2</li>
          <li>生日</li>
        </ul>
        <ul className="flex gap-x-4">
          <li className="w-[42px]">2/22</li>
          <li>領養日</li>
        </ul>
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
