import Select from "./Select";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import TextInput from "./TextInput";
import { VisitType, visitOptions } from "./data";
import { Controller, useForm } from "react-hook-form";
import { errorText } from "@/common/lib/messageText";
import { useContext, useState } from "react";
import { PetIdContext } from "@/pages/record_dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { fetchAddMedicalCard } from "@/common/fetch/recordCard";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/hint/Loading";
import { mediaUpload } from "@/common/fetch/mediaManager";

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
  photo: File | string | null;
  targetDate: string;
  remindDate: string;
}

interface PropsType {
  onClose: () => void;
}

const MedicalRecord: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { token } = useSelector((state: RootState) => state.userInfo);
  const { petId } = useContext(PetIdContext);
  const [isLoading, setIsLoading] = useState(false);

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
    photo: null,
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

  const handleAddCard = async (data: FormType) => {
    if (!token || !petId) return;

    if (!data.title || !data.visitType) {
      setError("root", { type: "manual", message: "請輸入必填項目" });
      return;
    }

    setIsLoading(true);

    if (data.photo instanceof File) {
      const uploadResult = await mediaUpload(data.photo, "medical");
      if (uploadResult) {
        data.photo = uploadResult.secure_url;
      }
    }

    const response = await fetchAddMedicalCard(token, petId, data);
    if (!response.ok) {
      alert("新增失敗，請稍後再試");
    }
    alert("新增成功");

    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddCard)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="title"
          control={control}
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
              name="visitType"
              control={control}
              render={({ field }) => (
                <Select {...field} title="選擇類型" options={visitOptions} />
              )}
            />
          </div>
        </div>
        <Controller
          name="hospital"
          control={control}
          render={({ field }) => (
            <TextInput {...field} title="醫院" placeholder="請輸入醫院名稱" />
          )}
        />
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              title="獸醫師"
              placeholder="請輸入獸醫師名稱"
            />
          )}
        />
        <Controller
          name="medicine"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              title="服用藥物"
              placeholder="請輸入藥品名稱"
            />
          )}
        />
        <Controller
          name="check"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              title="臨床檢查"
              placeholder="請輸入臨床檢查結果"
              isArea
            />
          )}
        />
        <Controller
          name="notice"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              title="居家注意事項"
              placeholder="請輸入居家注意事項"
              isArea
            />
          )}
        />
        <Controller
          name="cost"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              title="開銷"
              placeholder="請輸入數字"
              isMoney
            />
          )}
        />
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <ImageInput
              {...field}
              onChange={(file: File | null) => field.onChange(file)}
              setError={() =>
                setError("photo", { message: errorText.IMAGE_OVERSIZE })
              }
              message={errors.photo?.message}
            />
          )}
        />
        <Controller
          name="remindDate"
          control={control}
          render={({ field }) => (
            <DateInput
              {...field}
              title="回診提醒"
              placeholder="新增提醒日期"
              type="time"
            />
          )}
        />
        {errors.root?.message && (
          <div className="flex justify-center">
            <ErrorMessage>{errors.root?.message}</ErrorMessage>
          </div>
        )}
        <button
          type="submit"
          className="mt-2 py-2 rounded-full bg-primary text-white"
        >
          儲存
        </button>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default MedicalRecord;
