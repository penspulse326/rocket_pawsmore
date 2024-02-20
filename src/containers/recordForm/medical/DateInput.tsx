import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { zhTW } from "date-fns/locale";
import { IconCalendarPlus } from "@tabler/icons-react";
import { useState } from "react";
import moment from "moment";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  type: "date" | "time";
  onChange?: () => void;
}

const DateInput: React.FC<PropsType> = ({ title, name, placeholder, type }) => {
  const [date, setDate] = useState<Date>();

  const handleChange = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">{title}</span>
      <div className="flex-grow flex items-center max-w-[248px]">
        <DatePicker
          dateFormat="yyyy-MM-dd"
          calendarStartDay={1}
          locale={zhTW}
          showTimeSelect={type === "time"}
          timeFormat="HH:mm"
          timeIntervals={30}
          selected={date}
          onChange={handleChange}
          customInput={
            <label className="flex items-center gap-2 cursor-pointer">
              <IconCalendarPlus />
              <span className="text-note">
                {date ? moment(date).format("YYYY-MM-DD HH:mm") : placeholder}
              </span>
              <input
                type="text"
                readOnly={true}
                name={name}
                value={moment(date).format("YYYY-MM-DD HH:mm")}
                className="hidden"
              />
            </label>
          }
        />
      </div>
    </div>
  );
};

export default DateInput;
