import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="outter flex justify-between items-center pl-8 pr-6 h-16">
      {/* Logo 連結 */}
      <Link href="/test/social" className="flex items-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          priority
          width={32}
          height={32}
        />
        <Image
          src="/images/logo-text.svg"
          alt="logo-text"
          priority
          width={0}
          height={0}
          className="ml-2 w-auto h-6"
        />
      </Link>
      {/* 頁面連結 */}
      <div className="flex">
        <Link href="/test/social" className="flex gap-2 px-8 py-6">
          <Image src="/icons/home.svg" alt="home" width={24} height={24} />
          社群首頁
        </Link>
        <Link href="/test/social" className="flex gap-2 px-8 py-6">
          <Image src="/icons/analytics.svg" alt="home" width={24} height={24} />
          數據紀錄
        </Link>
      </div>
      {/* 個人資訊按鈕 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-2 w-20 border border-stroke rounded-[30px]"
        >
          <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ">
            <Image
              src="/test/user-chichi.png"
              alt="user"
              width={100}
              height={100}
              className="scale-125"
            />
          </div>
          <Image
            src="/icons/burger.svg"
            alt="menu"
            width={16}
            height={16}
            className={`${isMenuOpen && "rotate-90"} duration-300`}
          />
        </button>
        <ul
          className={`${
            isMenuOpen ? "tenkai" : "fuuin"
          } absolute right-0 mt-2 w-40 h-auto px-6 py-4 border border-stroke rounded-[20px] bg-white overflow-hidden`}
        >
          <li>
            <Link href="#">訊息</Link>
          </li>
          <li>
            <Link href="#">通知</Link>
          </li>
          <li>
            <Link href="#">喜歡的貼文</Link>
          </li>
          <li>
            <Link href="#">個人帳號資料</Link>
          </li>
          <li>
            <Link href="#">寵物基本資料</Link>
          </li>
          <li>
            <Link href="#">登出</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
