import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Loading from "@/components/hint/Loading";

import { mediaUpload } from "@/common/fetch/mediaManager";
import { fetchAddMomentCard } from "@/common/fetch/recordCard";

import type { RootState } from "@/common/redux/store";
import { momentCategory } from "@/common/lib/formText";
import { PetIdContext, DateContext } from "@/pages/record_dashboard";
import {
  behaviorOptions,
  habitOptions,
  surpriseOptions,
  socialOptions,
} from "@/common/lib/formText";

import { MomentCategoryType, MomentIdType } from "@/types/enums";
import { MomentDataType, MomentFormType, OptionType } from "@/types";
import { Controller, useForm } from "react-hook-form";
import ImageInput from "../ImageInput";
import { errorText } from "@/common/lib/messageText";
import Select from "../Select";
import ErrorMessage from "@/components/ErrorMessage";
import TextInput from "../medical/TextInput";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const defaultValues: MomentFormType = {
  card: 2,
  momentType: null,
  momentId: null,
  momentDetails: "",
  desc: "",
  photo: null,
  targetDate: "",
};

interface PropsType {
  onClose: () => void;
}

const MomentForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { petId } = useContext(PetIdContext);
  const { selectedDate } = useContext(DateContext);
  const { token } = useSelector((state: RootState) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);

  const options: Record<MomentCategoryType, OptionType[]> = {
    [MomentCategoryType.行為表現]: behaviorOptions,
    [MomentCategoryType.生活習慣]: habitOptions,
    [MomentCategoryType.驚喜]: surpriseOptions,
    [MomentCategoryType.社交]: socialOptions,
    [MomentCategoryType.技能]: [],
  };

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<MomentFormType>({
    defaultValues: { ...defaultValues, targetDate: selectedDate },
  });

  const selectedMomentType = watch("momentType");

  const handleAddMoment = async (data: MomentFormType) => {
    if (!token || !petId) {
      return;
    }
    clearErrors();
    setIsLoading(true);

    const { momentType, momentId, momentDetails, photo } = data;

    if (momentType === MomentCategoryType.技能 && !momentDetails) {
      setError("root", { type: "required", message: "請填入必填項目" });
      return;
    } else if (momentType === null && momentId === null) {
      setError("root", { type: "required", message: "請填入必填項目" });
      return;
    }

    if (photo instanceof File) {
      const uploadResult = await mediaUpload(photo, "medical");
      if (uploadResult) {
        data.photo = uploadResult.secure_url;
      }
    }

    const response = await fetchAddMomentCard(token, petId, data);
    if (!response.ok) {
      alert("新增失敗，請稍後再試");
    }
    alert("新增成功");

    setIsLoading(false);
    handleClose();
  };

  useEffect(() => {
    if (selectedMomentType === MomentCategoryType.技能) {
      setValue("momentId", MomentIdType.自填);
    } else {
      setValue("momentId", null);
    }
  }, [selectedMomentType]);

  return (
    <>
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit(handleAddMoment)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          {/* event category */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              事件分類<span className="text-error font-semibold">*</span>
            </span>
            <div className="flex-grow flex items-center max-w-[248px]">
              <Controller
                name="momentType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    title="選擇類型"
                    options={momentCategory}
                  />
                )}
              />
            </div>
          </div>
          {/* event content */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              內容<span className="text-error font-semibold">*</span>
            </span>
            <div className="flex-grow flex items-center max-w-[248px]">
              {selectedMomentType === MomentCategoryType.技能 ? (
                <Controller
                  name="momentDetails"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      title=""
                      placeholder="學會了什麼技能"
                    />
                  )}
                />
              ) : (
                <Controller
                  name="momentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      title="選擇重要時刻內容"
                      options={options[selectedMomentType!]}
                    />
                  )}
                />
              )}
            </div>
          </div>
          {/* photo */}
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
          {/* description */}
          <div className="flex justify-between items-start mt-1">
            <span className="font-semibold">事件描述</span>
            <div className="flex-grow flex items-center max-w-[248px]">
              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="詳細描述這個重要時刻，紀錄你與寵物獨特的難忘體驗。"
                    className="px-4 py-3 h-[120px] border border-stroke rounded-[10px] max-w-[248px] w-full resize-none"
                  ></textarea>
                )}
              />
            </div>
          </div>
        </div>
        {errors.root?.message && (
          <div className="flex justify-center">
            <ErrorMessage>{errors.root?.message}</ErrorMessage>
          </div>
        )}
        <button
          type="submit"
          className="py-2 rounded-full bg-primary text-white"
        >
          儲存
        </button>
      </form>
    </>
  );
};

export default MomentForm;
