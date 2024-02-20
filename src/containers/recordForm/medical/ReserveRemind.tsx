import Select from "./Select";
import DateInput from "./DateInput";

import { visitOptions } from "./data";

const ReserveRemind = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          事件分類
          <span className="text-error">*</span>
        </span>
        <div className="flex-grow flex items-center max-w-[248px]">
          <Select title="選擇類型" name="reserveType" options={visitOptions} />
        </div>
      </div>
      <DateInput
        name="reserveDate"
        title="預約日期"
        placeholder="選擇日期與時間"
        type="time"
      />
    </div>
  );
};

export default ReserveRemind;
