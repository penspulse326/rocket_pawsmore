import Select from "./Select";
import DateInput from "./DateInput";
import { VisitType, reserveOptions } from "./data";
import RadioCheck from "@/components/form/record/RadioCheck";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { useContext, useState } from "react";
import { DateContext, PetIdContext } from "@/pages/record_dashboard";
import { Controller, useForm } from "react-hook-form";
import { fetchAddMedicalCard } from "@/common/fetch/recordCard";
import Loading from "@/components/hint/Loading";
import ErrorMessage from "@/components/ErrorMessage";

interface FormType {
  card: number;
  cardType: number;
  visitType: number;
  reserveType: null | VisitType;
  reserveDate: string;
  targetDate: string;
}

interface PropsType {
  onClose: () => void;
}

const ReserveRemind: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { token } = useSelector((state: RootState) => state.userInfo);
  const { petId } = useContext(PetIdContext);
  const { selectedDate } = useContext(DateContext);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: FormType = {
    card: 1,
    cardType: 0,
    visitType: 0,
    reserveType: null,
    reserveDate: "",
    targetDate: selectedDate,
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

  const handleAddReserveRemind = async (data: FormType) => {
    if (!token || !petId) return;

    const { reserveType, targetDate } = data;
    if (reserveType === null || !targetDate) {
      setError("root", { type: "manual", message: "請選擇類型與日期" });
    }

    setIsLoading(true);
    const response = await fetchAddMedicalCard(token, petId, data);

    if (response.ok) {
      alert("新增成功");
      handleClose();
    } else {
      setError("card", {
        type: "manual",
        message: "新增失敗，請稍後再試",
      });
    }

    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddReserveRemind)}
        className="flex flex-col gap-4"
      >
        <RadioCheck
          name="醫療提醒"
          text="新增提醒日期"
          checked={true}
          onChange={() => {}}
        />
        <div className="flex justify-between items-center">
          <span className="font-semibold">提醒類型</span>
          <div className="flex-grow flex items-center max-w-[248px]">
            <Controller
              name="reserveType"
              control={control}
              render={({ field }) => (
                <Select {...field} title="選擇類型" options={reserveOptions} />
              )}
            />
          </div>
        </div>
        <Controller
          name="reserveDate"
          control={control}
          render={({ field }) => (
            <DateInput
              {...field}
              title="預約日期"
              placeholder="選擇日期與時間"
              type="time"
            />
          )}
        />
        <div className="flex justify-center mt-2">
          <ErrorMessage>{errors.root?.message}</ErrorMessage>
        </div>
        <button
          type="submit"
          className="pt-2 py-2 rounded-full bg-primary text-white"
        >
          儲存
        </button>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default ReserveRemind;
