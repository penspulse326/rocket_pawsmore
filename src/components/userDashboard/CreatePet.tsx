import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import BtnLoading from "../hint/BtnLoading";

import UploadPhoto from "../form/profile/UploadPhoto";
import RadioSelect from "../form/profile/RadioSelect";
import TextInput from "../form/profile/TextInput";
import DateInput from "../form/profile/DateInput";

import { mediaUpload } from "@/common/fetch/mediaManager";
import {
  fetchCreatePet,
  fetchUpdatePet,
  fetchGetPetList,
} from "@/common/fetch/petProfile";

import { setPetList } from "@/common/redux/petListSlice";
import { RootState } from "@/common/redux/store";

import { errorText } from "@/common/lib/messageText";
import { gender, species } from "@/common/lib/formText";
import type { PetFormType } from "@/types";

const CreatePet: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { token, userId } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const defaultValues = {
    petAccount: "",
    petName: "",
    petSpecies: null,
    petGender: null,
    breed: "",
    birthday: "",
    adoptedDate: "",
    petPhoto: null,
    petIntro: "",
    link: "",
  };

  const handleCreatePet = async (data: PetFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    // 請求新增寵物資料
    const response = await fetchCreatePet(data, token);

    if (response.status === 500) {
      setIsLoading(false);
      alert("發生未知錯誤，請稍候再試");
      return;
    }

    if (!response.ok) {
      setStatusCode(response.status);
      setIsLoading(false);
      return;
    }

    // // 確定新增成功才做上傳雲端圖片
    // // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (data.petPhoto) {
      const petId = response.data.petId;

      try {
        const uploadResult = await mediaUpload(data.petPhoto, "pet");
        const imgUrl = uploadResult.secure_url;

        const response = await fetchUpdatePet(data, token, imgUrl, petId);

        if (!response.ok) {
          setIsLoading(false);
          setStatusCode(response.status);
          alert("新增失敗，請稍候再試");
          return;
        }
      } catch (error) {
        setIsLoading(false);
        setStatusCode(500);
        alert("新增失敗，請稍候再試");
        return;
      }
    }
    if (userId) {
      try {
        const result = await fetchGetPetList(userId);
        dispatch(setPetList(result.data));

        setIsLoading(false);
        setStatusCode(result.status);
      } catch (error) {
        setStatusCode(500);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(false);
    alert("新增成功");
    router.push("/");
  };

  const handleAdd = (data: PetFormType) => handleCreatePet(data);

  const Form = () => {
    const {
      handleSubmit,
      control,
      setError,
      clearErrors,
      formState: { errors },
    } = useForm<PetFormType>({ defaultValues });

    return (
      <section className="p-8 border border-stroke rounded-[30px] w-full">
        <h2 className="text-2xl">寵物基本資料</h2>
        <form onSubmit={handleSubmit(handleAdd)} className="mt-4">
          <section className="flex gap-12 w-full">
            {/* 上傳照片 */}
            <Controller
              name="petPhoto"
              control={control}
              render={({ field }) => (
                <UploadPhoto
                  {...field}
                  title="寵物照片"
                  setError={() =>
                    setError("petPhoto", { message: errorText.IMAGE_OVERSIZE })
                  }
                  clearErrors={() => clearErrors("petPhoto")}
                  message={errors.petPhoto?.message}
                  onChange={(file: File) => field.onChange(file)}
                />
              )}
            />
            {/* 其他欄位 */}
            <div className="flex-grow flex flex-col gap-4">
              {/* 物種 */}
              <Controller
                name="petSpecies"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <RadioSelect
                    {...field}
                    title="物種"
                    dataSet={species}
                    message={errors.petSpecies?.message}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {/* 性別 */}
              <Controller
                name="petGender"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <RadioSelect
                    {...field}
                    title="性別"
                    dataSet={gender}
                    message={errors.petGender?.message}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {/* 品種 */}
              <Controller
                name="breed"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    title="品種"
                    placeholder="米克斯、柴犬、敘利亞倉鼠等等"
                    message={errors.breed?.message}
                    star={true}
                  />
                )}
              />
              {/* 生日 */}
              <Controller
                name="birthday"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    title="生日"
                    message={errors.birthday?.message}
                    star={true}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {/* 領養日 */}
              <Controller
                name="adoptedDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    title="領養日"
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
          </section>
          {/* 寵物帳號資料 */}
          <section className="flex flex-col gap-4 mt-12">
            <h2 className="text-2xl">寵物基本資料</h2>
            <div className="flex gap-8">
              {/* 寵物帳號 */}
              <Controller
                name="petAccount"
                control={control}
                rules={{
                  required: errorText.REQUIRED,
                  pattern: {
                    value: /^[a-zA-Z0-9]{1,}$/,
                    message: errorText.ACCOUNT_INVALID,
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    title="寵物帳號"
                    placeholder="設定寵物帳號，30字內以英數字組成。"
                    message={errors.petAccount?.message}
                    maxLength={30}
                    star={true}
                    {...field}
                  />
                )}
              />
              {/* 寵物名稱 */}
              <Controller
                name="petName"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    title="寵物名稱"
                    placeholder="在個人檔案上顯示寵物的名稱"
                    maxLength={15}
                    message={errors.petName?.message}
                    star={true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex gap-8">
              {/* 寵物簡介 */}
              <Controller
                name="petIntro"
                control={control}
                render={({ field }) => (
                  <TextInput
                    title="寵物簡介"
                    placeholder="輸入寵物簡介"
                    {...field}
                  />
                )}
              />
              {/* 連結 */}
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <TextInput
                    title="連結"
                    placeholder="新增外部連結"
                    {...field}
                  />
                )}
              />
            </div>
          </section>
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center mt-12 py-2 w-full min-h-[46px] rounded-full bg-primary text-xl text-white font-semibold"
          >
            {isLoading ? <BtnLoading /> : "新增寵物檔案"}
          </button>
        </form>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-y-8 max-w-[728px]">
      <div className="text-xl">新增寵物檔案</div>
      <Form />
    </div>
  );
};

export default CreatePet;
