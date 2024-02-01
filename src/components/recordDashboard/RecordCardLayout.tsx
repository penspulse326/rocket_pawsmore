import { useState, useContext } from "react";
import moment from "moment";
import { IconChevronUp, IconCirclePlus } from "@tabler/icons-react";
import { DateContext } from "@/pages/record_dashboard";
import Date from "./recordCard/Date";
import { originalData } from "@/common/lib/test/eventData";

const RecordCardLayout = () => {
  const { selectedDate } = useContext(DateContext);

  const AddRecordBtn = () => {
    const [isShown, setIsShown] = useState(false);
    const ShowRecordType = () => {
      const recordType = [
        {
          title: "日常紀錄",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#969AFF" />
            </svg>
          ),
        },
        {
          title: "醫療紀錄",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#FF6D80" />
            </svg>
          ),
        },
        {
          title: "重要時刻",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#FFA959" />
            </svg>
          ),
        },
      ];
      return (
        <div className="absolute top-[101px] bg-white max-w-[164px] p-3 rounded-3xl shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
          {recordType.map((item, index) => {
            return (
              <ul
                className="flex gap-x-[10px] px-3 py-1 rounded-[30px] hover:bg-secondary hover:cursor-pointer"
                key={index}
              >
                <li>新增</li>
                <ol className="flex gap-x-1 items-center">
                  {item.icon}
                  <li>{item.title}</li>
                </ol>
              </ul>
            );
          })}
        </div>
      );
    };
    return (
      <div
        className="relative flex gap-x-2 justify-center items-center border border-stroke rounded-[30px] min-w-[416px] max-w-[416px] min-h-[161px] hover:bg-secondary hover:cursor-pointer"
        onClick={() => setIsShown(!isShown)}
        onBlur={() => setIsShown(false)}
        tabIndex={-1}
      >
        <div className="text-primary">點擊以新增紀錄</div>
        <IconCirclePlus size={24} color={"#203170"} />
        {isShown && <ShowRecordType />}
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 max-w-[480px]">
      <Date />
      <AddRecordBtn />
    </section>
  );
};

export default RecordCardLayout;
