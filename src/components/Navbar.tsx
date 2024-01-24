import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState(0);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stroke bg-white">
      <div className="outter flex justify-between items-center pl-8 pr-6 h-16">
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
        <div className="relative flex">
          <Link
            href="/test/social"
            className="flex gap-2 px-8 pt-6 pb-5"
            onClick={() => setPage(0)}
          >
            <Image
              src="/icons/icon-home.svg"
              alt="home"
              width={24}
              height={24}
            />
            社群首頁
          </Link>
          <Link
            href="#"
            className="flex gap-2 px-8 pt-6 pb-5"
            onClick={() => setPage(1)}
          >
            <Image
              src="/icons/icon-analytics.svg"
              alt="home"
              width={24}
              height={24}
            />
            數據紀錄
          </Link>
          <div
            className={`
          ${
            page ? "slide-r" : "slide-l"
          } absolute bottom-0 w-[50%] h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]
        `}
          ></div>
        </div>
        {/* 個人資訊按鈕 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${
              isMenuOpen && "shadow-[0_0px_10px_0_rgba(0,0,0,0.15)]"
            } flex items-center gap-2 p-2 w-20 border border-stroke rounded-[30px]`}
          >
            <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ">
              <Image
                src="/test/user-chichi.png"
                alt="user"
                width={100}
                height={100}
                className="scale-110"
              />
            </div>
            <Image
              src="/icons/icon-burger.svg"
              alt="menu"
              width={16}
              height={16}
              className={`${isMenuOpen && "rotate-90"} duration-300`}
            />
          </button>
          <ul
            className={`${
              isMenuOpen ? "tenkai-t-r" : "fuuin-t-r"
            } absolute right-0 flex flex-col mt-2 w-40 p-3 rounded-[24px] bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)] box-border`}
          >
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#" className="inline-block w-full">
                訊息
              </Link>
            </li>
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">通知</Link>
            </li>
            <li className="mb-2 px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">按過喜歡的貼文</Link>
            </li>
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">個人帳號資料</Link>
            </li>
            <li className="mb-2 px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">寵物基本資料</Link>
            </li>
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">登出</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
