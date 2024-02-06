import ErrorMessage from "@/components/ErrorMessage";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

const MemberForm = () => {
  return (
    <section className="flex flex-col gap-4 my-16 max-w-[728px] w-full">
      <div>
        <h2 className="text-[32px]">建立個人資料</h2>
        <h3 className="text-note">
          填寫您的個人資料，準備進入 Pawsmore 的世界。
        </h3>
      </div>
      <section className="p-8 border border-stroke rounded-[30px]">
        <form action="#">
          <div className="flex gap-12 w-full">
            {/* 上傳照片 */}
            <div>
              <h4>個人照片</h4>
              <label className="flex flex-col items-center gap-2 mt-4 cursor-pointer">
                <Image
                  src="/images/default-photo.png"
                  alt="member-photo"
                  width={200}
                  height={200}
                  className="mx-12 max-w-[172px] max-h-[172px] rounded-full"
                />
                <input type="file" name="photo" className="hidden" />
                <span className="flex items-center gap-2 text-primary">
                  <IconPhoto className="stroke-primary" />
                  上傳照片
                </span>
              </label>
            </div>
            {/* 其他欄位 */}
            <div className="flex-grow flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    用戶帳號<span className="text-error">*</span>
                  </span>
                  <ErrorMessage>此帳號已被使用</ErrorMessage>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="設定您的用戶帳號，以英數字組成"
                  className="p-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    用戶名稱<span className="text-error">*</span>
                  </span>
                  <ErrorMessage>用戶名稱不得為空</ErrorMessage>
                </h4>
                <input
                  type="text"
                  name="username"
                  placeholder="在個人檔案上顯示您的名稱"
                  className="p-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    個人簡介<span className="text-error">*</span>
                  </span>
                </h4>
                <textarea
                  name="introduction"
                  placeholder="輸入個人簡介"
                  className="p-3 w-full h-12 border border-stroke outline-note rounded-[10px] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>連結</span>
                </h4>
                <input
                  type="text"
                  name="link"
                  placeholder="新增外部連結"
                  className="p-3 w-full h-12 border border-stroke outline-note rounded-[10px] "
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 mt-12 w-full rounded-full bg-primary text-white"
          >
            建立個人資料
          </button>
        </form>
      </section>
    </section>
  );
};

export default MemberForm;
