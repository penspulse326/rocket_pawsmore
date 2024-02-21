import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { zhTW } from "date-fns/locale";
import { IconCalendarPlus } from "@tabler/icons-react";
import { forwardRef, useState } from "react";
import moment from "moment";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  type: "date" | "time";
  onChange?: (value: string) => void;
}

const DateInput = forwardRef<HTMLInputElement, PropsType>(
  ({ title, name, placeholder, type, onChange }, ref) => {
    const [date, setDate] = useState<Date>();

    const handleChange = (date: Date) => {
      setDate(date);
      onChange?.(moment(date).format("YYYY-MM-DD HH:mm"));
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
                  ref={ref}
                  type="text"
                  name={name}
                  className="hidden"
                  readOnly={true}
                />
              </label>
            }
          />
        </div>
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
