import "react-datepicker/dist/react-datepicker.css";

import { IconCalendarPlus } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { zhTW } from "date-fns/locale";
import { useState, forwardRef } from "react";

import ErrorMessage from "../../ErrorMessage";

interface DateInputPropsType {
  name: string;
  title: string;
  message?: string;
  onChange: (data: string) => void;
  onBlur: () => void;
  star?: boolean;
}

const DateInput = forwardRef<HTMLInputElement, DateInputPropsType>(
  ({ name, title, message, onChange, onBlur, star }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date>();

    const handleChange = (date: Date) => {
      console.log(date);
      setSelectedDate(date);
      onChange(moment(date).format("YYYY-MM-DD"));
    };

    const dateString = selectedDate
      ? moment(selectedDate).format("YYYY-MM-DD")
      : "選擇日期";

    return (
      <div className="flex flex-col gap-2">
        <h4 className="flex justify-between items-center">
          <span>
            {title}
            {star && <span className="text-error">*</span>}
          </span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <div>
          <DatePicker
            onChange={handleChange}
            onBlur={onBlur}
            selected={selectedDate}
            dateFormat="YYYY-MM-DD"
            showYearDropdown={true}
            scrollableYearDropdown={true}
            calendarStartDay={1}
            locale={zhTW}
            customInput={
              <label className="flex items-center gap-2 cursor-pointer">
                <IconCalendarPlus color={message && "#F23030"} />
                <span className={`${message ? "text-error" : "text-note"}`}>
                  {dateString}
                </span>
                <input
                  type="text"
                  ref={ref}
                  name={name}
                  value={dateString}
                  readOnly={true}
                  className="hidden"
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
