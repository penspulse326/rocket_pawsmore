import Select from "@/components/recordForm/Select";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import TextInput from "./TextInput";
import { visitOptions } from "./data";

const MedicalRecordInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        title="標題"
        name="title"
        placeholder="請輸入標題"
        star={true}
      />
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          事件分類
          <span className="text-error">*</span>
        </span>
        <div className="flex-grow flex items-center max-w-[248px]">
          <Select title="事件分類" name="visitType" options={visitOptions} />
        </div>
      </div>
      <TextInput title="醫院" name="hospital" placeholder="請輸入醫院名稱" />
      <TextInput title="獸醫師" name="doctor" placeholder="請輸入獸醫師名稱" />
      <TextInput
        title="服用藥物"
        name="medicine"
        placeholder="請輸入藥品名稱"
      />
      <TextInput
        title="臨床檢查"
        name="check"
        placeholder="請輸入臨床檢查結果"
        isArea
      />
      <TextInput
        title="居家注意事項"
        name="notice"
        placeholder="請輸入居家注意事項"
        isArea
      />
      <TextInput
        title="開銷"
        name="cost"
        placeholder="請輸入居家注意事項"
        isMoney
      />
      <ImageInput />
      <DateInput
        name="remindDate"
        title="回診提醒"
        placeholder="新增提醒日期"
      />
    </div>
  );
};

export default MedicalRecordInputs;
