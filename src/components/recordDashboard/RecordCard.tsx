import {
  IconChevronLeft,
  IconChevronRight,
  IconCirclePlus,
} from "@tabler/icons-react";
import moment from "moment";

const RecordCard = () => {
  const Date = () => {
    const currentMonth = moment().format("M");
    const currentDate = moment().format("DD");
    return (
      <div className="flex justify-center items-center gap-x-4">
        <IconChevronLeft
          size={24}
          color={"#808080"}
          className="hover:cursor-pointer"
        />
        <ul className="flex gap-x-2 text-2xl">
          <ol className="flex gap-x-1">
            <li>{currentMonth}</li>
            <li>月</li>
          </ol>
          <ol className="flex gap-x-1">
            <li>{currentDate}</li>
            <li>日</li>
          </ol>
        </ul>
        <IconChevronRight
          size={24}
          color={"#808080"}
          className="hover:cursor-pointer"
        />
      </div>
    );
  };

  return (
    <section className="border border-stroke rounded-[30px] p-8">
      <Date />
      <div>點擊新增紀錄</div>
    </section>
  );
};

export default RecordCard;
