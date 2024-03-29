import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { debounce } from "lodash";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { DateContext } from "@/pages/record_dashboard";

const Date: React.FC = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const [currentTime, setCurrentTime] = useState(moment(selectedDate));

  useEffect(() => {
    setCurrentTime(moment(selectedDate));
  }, [selectedDate]);

  return (
    <div className="flex justify-center items-center gap-x-4">
      <IconChevronLeft
        size={24}
        color={"#808080"}
        className="hover:cursor-pointer"
        onClick={debounce(
          () =>
            setSelectedDate(
              currentTime.clone().subtract(1, "day").format("YYYY-MM-DD")
            ),
          200
        )}
      />
      <ul className="flex gap-x-2 text-2xl justify-center font-medium max-w-[124px] w-full">
        <ol className="flex gap-x-1">
          <li className="font-['futura'] text-center w-[30px]">
            {currentTime.format("M")}
          </li>
          <li>月</li>
        </ol>
        <ol className="flex gap-x-1">
          <li className="font-['futura'] text-center w-[30px]">
            {currentTime.format("D")}
          </li>
          <li>日</li>
        </ol>
      </ul>
      <IconChevronRight
        size={24}
        color={"#808080"}
        className="hover:cursor-pointer"
        onClick={debounce(
          () =>
            setSelectedDate(
              currentTime.clone().add(1, "day").format("YYYY-MM-DD")
            ),
          200
        )}
      />
    </div>
  );
};

export default Date;
