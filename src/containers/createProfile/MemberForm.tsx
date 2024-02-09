import { Controller, useForm } from "react-hook-form";

import TextInput from "@/components/form/profile/TextInput";
import UploadPhoto from "@/components/form/profile/UploadPhoto";
import { errorText } from "@/common/lib/messageText";

import type { MemberFormType } from "@/types";

interface MemberFormPropsType {
  onSubmit: (data: MemberFormType) => void;
}

const MemberForm: React.FC<MemberFormPropsType> = ({
  onSubmit: handleCreateProfile,
}) => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<MemberFormType>({
    defaultValues: {
      account: "",
      username: "",
      headShot: undefined,
      introduction: "",
      link: "",
    },
  });

  const onSubmit = (data: MemberFormType) => handleCreateProfile(data);

  return (
    <section className="flex flex-col gap-4 my-16 max-w-[728px] w-full">
      <div>
        <h2 className="text-[32px]">建立個人資料</h2>
        <h3 className="text-note">
          填寫您的個人資料，準備進入 Pawsmore 的世界。
        </h3>
      </div>
      <section className="p-8 border border-stroke rounded-[30px]">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-12 w-full">
            {/* 上傳照片 */}
            <Controller
              name="headShot"
              control={control}
              render={({ field }) => (
                <UploadPhoto
                  {...field}
                  title="個人照片"
                  setError={setError}
                  clearErrors={clearErrors}
                  message={errors.headShot?.message}
                  onChange={(file: File) => field.onChange(file)}
                />
              )}
            />
            <div className="flex-grow flex flex-col gap-4">
              {/* 用戶帳號 */}
              <Controller
                name="account"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    title="用戶帳號"
                    placeholder="設定您的用戶帳號，以英數字組成"
                    message={errors.account?.message}
                    star={true}
                  />
                )}
              />
              {/* 用戶名稱 */}
              <Controller
                name="username"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    title="用戶名稱"
                    placeholder="在個人檔案上顯示您的名稱"
                    message={errors.username?.message}
                    star={true}
                  />
                )}
              />
              {/* 個人簡介 */}
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>個人簡介</span>
                </h4>
                <textarea
                  name="introduction"
                  placeholder="輸入個人簡介"
                  className="px-4 py-3 w-full h-12 border border-stroke outline-note rounded-[10px] "
                />
              </div>
              {/* 外部連結 */}
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    title="連結"
                    placeholder="新增外部連結"
                  />
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-12 py-2 w-full rounded-full bg-primary text-xl text-white font-semibold"
          >
            建立個人資料
          </button>
        </form>
      </section>
    </section>
  );
};

export default MemberForm;
