import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import UploadPhoto from "@/components/profileForm/UploadPhoto";

import { errorText } from "@/common/lib/messageText";
import TextInput from "@/components/profileForm/TextInput";
import DateInput from "@/components/profileForm/DateInput";
import RadioSelect from "@/components/profileForm/RadioSelect";
import { gender, species } from "@/common/lib/formText";
import BtnLoading from "@/components/hint/BtnLoading";

import type { PetFormType } from "@/types";

interface PetFormPropsType {
  isLoading: boolean;
  statusCode: number;
  onSubmit: (data: PetFormType) => void;
}

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

const PetForm: React.FC<PetFormPropsType> = ({
  isLoading,
  statusCode,
  onSubmit: handleCreatePet,
}) => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PetFormType>({ defaultValues });

  const router = useRouter();

  useEffect(() => {
    switch (statusCode) {
      case 401:
        alert(errorText.LOGIN_AGAIN);
        router.push("/login");
        break;
      case 409:
        setError("petAccount", { message: errorText.ACCOUNT_USED });
        break;
      case 500:
        setError("petAccount", { message: errorText.UNKNOWN_ERROR });
        break;
      default:
        break;
    }
  }, [statusCode]);

  const handleAdd = (data: any) => handleCreatePet(data);

  return (
    <section className="flex flex-col gap-4 my-16 max-w-[728px] w-full">
      <div>
        <h2 className="text-[32px]">新增寵物檔案</h2>
        <h3 className="text-note">
          為寵物建立專屬檔案，讓您的寶貝成為社群小明星。
        </h3>
      </div>
      <section className="p-8 border border-stroke rounded-[30px]">
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
        <div className="flex justify-end">
          <Link href="/social" className="mt-4 text-note underline">
            略過此步驟
          </Link>
        </div>
      </section>
    </section>
  );
};

export default PetForm;
