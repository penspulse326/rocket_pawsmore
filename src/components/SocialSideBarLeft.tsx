import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SocialSideBarLeft() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <aside className="col-span-3 flex flex-col pt-8 h-full">
      {/* 寵物列表 */}
      <div className="flex-grow">
        {/* 寵物卡片 */}
        <div className="flex flex-col gap-4 mx-auto p-4 max-w-[204px] border border-stroke rounded-[30px] bg-white">
          <Image
            src="/test/photo-cat-test.png"
            width={172}
            height={172}
            priority
            alt="寵物照片"
            className="rounded-[30px] object-cover"
          />
          <div>
            <p>角龍寶寶</p>
            <p>@littleprincess126</p>
          </div>
          <Link
            href="#"
            className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center hover:bg-primary/70 duration-300"
          >
            寵物檔案
          </Link>
        </div>
      </div>
      {/* 個人連結 */}
      <Link
        href="#"
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke"
      >
        <Image
          src="/test/user-chichi.png"
          width={48}
          height={48}
          alt="user"
          className="rounded-[50%]"
        />
        <div>
          <p>琪琪</p>
          <p className="text-note">@chichi1992126</p>
        </div>
      </Link>
      {/* 選單 */}
      <div className="relative">
        <ul
          className={`${
            isMenuOpen ? "tenkai" : "fuuin"
          } absolute left-0 bottom-[68px] flex flex-col mt-2 w-40 p-3 rounded-[24px] bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)] box-border`}
        >
          <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="inline-block w-full">
              訊息
            </Link>
          </li>
          <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#">通知</Link>
          </li>
          <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#">按過喜歡的貼文</Link>
          </li>
        </ul>
        <button
          type="button"
          className="flex items-center gap-2 py-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src="/icons/burger.svg"
            alt="menu"
            width={16}
            height={16}
            className={`${isMenuOpen && "-rotate-90"} duration-300`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          更多
        </button>
      </div>
    </aside>
  );
}
