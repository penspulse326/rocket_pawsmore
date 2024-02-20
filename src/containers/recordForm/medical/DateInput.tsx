import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { zhTW } from "date-fns/locale";
import { IconCalendarPlus } from "@tabler/icons-react";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  onChange?: () => void;
}

const DateInput: React.FC<PropsType> = ({ title, name, placeholder }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">{title}</span>
      <div className="flex-grow flex items-center max-w-[248px]">
        <DatePicker
          dateFormat="YYYY-MM-DD"
          calendarStartDay={1}
          locale={zhTW}
          onChange={() => {
            console.log("change");
          }}
          customInput={
            <label className="flex items-center gap-2 cursor-pointer">
              <IconCalendarPlus />
              <span className="text-note">{placeholder}</span>
              <input
                type="text"
                readOnly={true}
                name={name}
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
