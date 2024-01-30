import {
  IconHome,
  IconBrandGoogleAnalytics,
  IconMenu2,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { clearUserInfo } from "@/common/redux/userInfoSlice";
import Menu from "./Menu";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { id, photoUrl, username } = useSelector(
    (state: RootState) => state.userInfo
  );

  const isUserLogin = id !== "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState(0);

  const handleLogout = () => {
    dispatch(clearUserInfo());
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stroke bg-white">
      <div className="outter grid grid-cols-3 pl-8 pr-6 h-16">
        {/* Logo 連結 */}
        <Link href="/social" className="col-span-1 flex items-center">
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
        <div className="col-span-1 flex justify-center">
          <div className="relative flex justify-center">
            <Link
              href="/social"
              className="flex gap-2 px-8 pt-6 pb-5"
              onClick={() => setPage(0)}
            >
              <IconHome />
              社群首頁
            </Link>
            <Link
              href="/test/record_dashboard"
              className="flex gap-2 px-8 pt-6 pb-5"
              onClick={() => setPage(1)}
            >
              <IconBrandGoogleAnalytics />
              數據紀錄
            </Link>
            <div
              className={`
          ${
            page ? "slide-r" : "slide-l"
          } absolute left-0 bottom-0 w-[50%] h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]
        `}
            ></div>
          </div>
        </div>
        {/* 個人資訊按鈕 */}
        <div className="col-span-1 flex justify-end items-center">
          {isUserLogin ? (
            <div
              className={`${
                isMenuOpen && "shadow-[0_0px_10px_0_rgba(0,0,0,0.15)]"
              } relative col-span-1 w-20 border border-stroke rounded-[30px] duration-300`}
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onBlur={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 w-full h-full"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={username}
                    width={100}
                    height={100}
                    className="scale-110"
                  />
                </div>
                <IconMenu2
                  className={`${
                    isMenuOpen && "rotate-90"
                  } w-4 h-4 duration-300`}
                />
              </button>
              <Menu
                isMenuOpen={isMenuOpen}
                userId={id}
                handleLogout={handleLogout}
              />
            </div>
          ) : (
            <Link href="/login">登入</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
