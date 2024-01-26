import Image from "next/image";

const Upcoming = () => {
  return (
    <section className="flex flex-col gap-y-2">
      <div className="text-note">即將到來</div>
      <div className="flex border border-stroke rounded-[30px] p-8">
        {/* reminders */}
        <ul className="flex flex-col gap-y-2 w-1/2">
          <ol className="flex gap-x-1 items-center">
            <Image
              src="/test/icon-exclamation.svg"
              width={6}
              height={24}
              alt="exclamation mark"
            />
            <li>醫療提醒</li>
          </ol>
          <ol className="flex flex-col gap-y-1">
            <li>1/25 年度健檢</li>
            <li>1/25 打疫苗</li>
          </ol>
        </ul>
        {/* moments */}
        <ul className="flex flex-col gap-y-2 w-1/2">
          <ol className="flex gap-x-1 items-center">
            <Image
              src="/test/icon-dot.svg"
              width={6}
              height={24}
              alt="dot symbol"
            />
            <li>重要時刻</li>
          </ol>
          <ol className="flex flex-col gap-y-1">
            <li>1/11 初次相遇</li>
            <li>1/17 生日快樂</li>
          </ol>
        </ul>
      </div>
    </section>
  );
};

export default Upcoming;
