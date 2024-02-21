import Select from "./Select";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import TextInput from "./TextInput";
import { VisitType, visitOptions } from "./data";
import { Controller, useForm } from "react-hook-form";

interface FormType {
  card: 1;
  cardType: 1;
  reserveType: 0;
  visitType: null | VisitType;
  title: string;
  hospital: string;
  doctor: string;
  medicine: string;
  check: string;
  notice: string;
  cost: null | number;
  photo: File | undefined;
  targetDate: string;
  remindDate: string;
}

interface PropsType {
  onClose: () => void;
}

const MedicalRecordInputs: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const defaultValues: FormType = {
    card: 1,
    cardType: 1,
    reserveType: 0,
    visitType: null,
    title: "",
    hospital: "",
    doctor: "",
    medicine: "",
    check: "",
    notice: "",
    cost: null,
    photo: undefined,
    targetDate: "",
    remindDate: "",
  };

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues,
  });

  const handleAddMedicalRecord = () => {};

  return (
    <form
      onSubmit={handleSubmit(handleAddMedicalRecord)}
      className="flex flex-col gap-4"
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            {...field}
            title="標題"
            placeholder="請輸入標題"
            star={true}
          />
        )}
      />
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          事件分類
          <span className="text-error">*</span>
        </span>
        <div className="flex-grow flex items-center max-w-[248px]">
          <Controller
            control={control}
            name="visitType"
            render={({ field }) => (
              <Select {...field} title="選擇類型" options={visitOptions} />
            )}
          />
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
      <TextInput title="開銷" name="cost" placeholder="請輸入數字" isMoney />
      <ImageInput />
      <DateInput
        name="remindDate"
        title="回診提醒"
        placeholder="新增提醒日期"
        type="time"
      />
      <button
        type="submit"
        className="mt-2 py-2 rounded-full bg-primary text-white"
      >
        儲存
      </button>
    </form>
  );
};

export default MedicalRecordInputs;
