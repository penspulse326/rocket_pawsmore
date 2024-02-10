import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import UploadPhoto from "@/components/form/profile/UploadPhoto";

import { errorText } from "@/common/lib/messageText";
import TextInput from "@/components/form/profile/TextInput";
import DateInput from "@/components/form/profile/DateInput";
import RadioSelect from "@/components/form/profile/RadioSelect";
import { gender, species } from "@/common/lib/formText";

import type { PetFormType } from "@/types";

const defaultValues = {
  petAccount: "",
  petName: "",
  petSpecies: null,
  petGender: null,
  breed: "",
  birthday: "",
  adoptedDate: "",
  petPhoto: "",
  petIntro: "",
  link: "",
};

const PetForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PetFormType>({ defaultValues });

  const handleAdd = (data: any) => console.log(data);

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
                name="petSpecies"
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
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    title="寵物帳號"
                    placeholder="設定寵物帳號，以英數字組成。"
                    message={errors.petAccount?.message}
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
            className="py-2 mt-12 w-full rounded-full bg-primary text-xl text-white font-semibold"
          >
            新增寵物檔案
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
