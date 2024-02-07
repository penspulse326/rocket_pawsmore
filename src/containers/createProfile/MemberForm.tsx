import { Controller, useForm } from "react-hook-form";

import TextInput from "@/components/form/profile/TextInput";
import { errorText } from "@/common/lib/messageText";
import UploadPhoto from "@/components/form/profile/UploadPhoto";

const MAX_FILE_SIZE = 1024 * 1024;

interface MemberFormPropsType {
  onSubmit: (data: FormInputType) => void;
}

export interface FormInputType {
  account: string;
  name: string;
  headShot?: File;
  introduction?: string;
  link?: string;
}

const MemberForm: React.FC<MemberFormPropsType> = ({
  onSubmit: handleCreateProfile,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputType>({
    defaultValues: {
      account: "",
      name: "",
      headShot: undefined,
      introduction: "",
      link: "",
    },
  });

  console.log(errors);

  const onSubmit = (data: FormInputType) => {
    console.log(data);
  };

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
              rules={{
                validate: (file) =>
                  !file ||
                  !(file instanceof FileList) ||
                  file.length === 0 ||
                  file[0].size <= MAX_FILE_SIZE ||
                  "圖片大小不能超過 1MB",
              }}
              render={({ field }) => (
                <UploadPhoto
                  {...field}
                  title="個人照片"
                  message={errors.headShot?.message}
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
                  />
                )}
              />
              {/* 用戶名稱 */}
              <Controller
                name="name"
                control={control}
                rules={{ required: errorText.REQUIRED }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    title="用戶名稱"
                    placeholder="在個人檔案上顯示您的名稱"
                    message={errors.name?.message}
                  />
                )}
              />
              {/* 個人簡介 */}
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    個人簡介<span className="text-error">*</span>
                  </span>
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
            className="py-2 mt-12 w-full rounded-full bg-primary text-xl text-white font-semibold"
          >
            建立個人資料
          </button>
        </form>
      </section>
    </section>
  );
};

export default MemberForm;
