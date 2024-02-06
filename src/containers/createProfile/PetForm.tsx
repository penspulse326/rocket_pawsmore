import ErrorMessage from "@/components/ErrorMessage";
import { IconCalendarPlus } from "@tabler/icons-react";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const PetForm = () => {
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
        <form action="#" className="mt-4">
          <section className="flex gap-12 w-full">
            {/* 上傳照片 */}
            <div>
              <h4>寵物照片</h4>
              <label className="flex flex-col items-center gap-4 mt-4 cursor-pointer">
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
              {/* 物種 */}
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    物種<span className="text-error">*</span>
                  </span>
                  <ErrorMessage>必填</ErrorMessage>
                </h4>
                <div className="flex gap-1">
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    狗
                    <input
                      type="radio"
                      name="species"
                      value="dog"
                      className="hidden"
                    />
                  </label>
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    貓
                    <input
                      type="radio"
                      name="species"
                      value="cat"
                      className="hidden"
                    />
                  </label>
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    倉鼠
                    <input
                      type="radio"
                      name="species"
                      value="rice"
                      className="hidden"
                    />
                  </label>
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    其他
                    <input
                      type="radio"
                      name="species"
                      value="other"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {/* 性別 */}
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>
                    性別<span className="text-error">*</span>
                  </span>
                  <ErrorMessage>必填</ErrorMessage>
                </h4>
                <div className="flex gap-1">
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    男生
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="hidden"
                    />
                  </label>
                  <label className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer">
                    女生
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {/* 品種 */}
              <div className="flex flex-col gap-1">
                <h4 className="flex justify-between items-center">
                  <span>品種</span>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="米克斯、柴犬、敘利亞倉鼠等等"
                  className="px-4 py-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
              {/* 生日 */}
              <div className="flex flex-col gap-2">
                <h4 className="flex justify-between items-center">
                  <span>
                    生日<span className="text-error">*</span>
                  </span>
                </h4>
                <div className="flex items-center gap-2">
                  <button type="button">
                    <IconCalendarPlus />
                  </button>
                  <span className="text-note">選擇日期</span>
                </div>
              </div>
              {/* 領養日 */}
              <div className="flex flex-col gap-2">
                <h4 className="flex justify-between items-center">
                  <span>領養日</span>
                </h4>
                <div className="flex items-center gap-2">
                  <button type="button">
                    <IconCalendarPlus />
                  </button>
                  <span className="text-note">選擇日期</span>
                </div>
              </div>
            </div>
          </section>
          {/* 寵物帳號資料 */}
          <section className="flex flex-col gap-4 mt-12">
            <h2 className="text-2xl">寵物基本資料</h2>
            <div className="flex gap-8 w-full">
              {/* 寵物帳號 */}
              <div className="flex flex-col gap-1 w-[50%]">
                <h4 className="flex justify-between items-center">
                  <span>
                    寵物帳號<span className="text-error">*</span>
                  </span>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="設定寵物帳號，以英數字組成。"
                  className="px-4 py-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
              {/* 寵物名稱 */}
              <div className="flex flex-col gap-1 w-[50%]">
                <h4 className="flex justify-between items-center">
                  <span>
                    寵物名稱<span className="text-error">*</span>
                  </span>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="在個人檔案上顯示寵物的名稱"
                  className="px-4 py-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
            </div>
            <div className="flex gap-8 w-full">
              {/* 寵物帳號 */}
              <div className="flex flex-col gap-1 w-[50%]">
                <h4 className="flex justify-between items-center">
                  <span>寵物簡介</span>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="輸入寵物簡介"
                  className="px-4 py-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
              {/* 寵物名稱 */}
              <div className="flex flex-col gap-1 w-[50%]">
                <h4 className="flex justify-between items-center">
                  <span>連結</span>
                </h4>
                <input
                  type="text"
                  name="account"
                  placeholder="新增外部連結"
                  className="px-4 py-3 w-full border border-stroke outline-note rounded-[10px] "
                />
              </div>
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
