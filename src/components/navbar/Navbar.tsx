import { IconHome, IconBrandGoogleAnalytics } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, resetState } from "@/common/redux/store";
import { setUserInfo } from "@/common/redux/userInfoSlice";
import { setPetList } from "@/common/redux/petListSlice";

import BurgerMenu from "./BurgerMenu";
import useToken from "@/common/hooks/useToken";
import { fetchCheckAuth } from "@/common/fetch/auth";
import { fetchGetPetList } from "@/common/fetch/petProfile";

const Navbar: React.FC = () => {
  const { token: localToken, clearUser } = useToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const { headShot, username, userId } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [page, setPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sliderStyle = `${
    page ? "slide-r" : "slide-l"
  } absolute left-0 bottom-0 w-[50%] h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]
`;

  // 檢查登入狀態
  const checkLogin = async () => {
    if (!localToken) {
      return;
    }

    const response = await fetchCheckAuth(localToken);
    if (!response.ok) {
      alert("登入狀態過期，請重新登入");
      clearUser();
      setIsLoggedIn(false);
    }

    dispatch(setUserInfo({ ...response.data, token: localToken }));
    setIsLoggedIn(true);
  };

  // 取得寵物列表
  const handleGetPetList = async () => {
    if (userId) {
      const result = await fetchGetPetList(userId);
      dispatch(setPetList(result.data));
    }
  };

  const handleLogout = () => {
    dispatch(resetState());
    clearUser();
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    checkLogin();
  }, [localToken]);

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      handleGetPetList();

      const path = router.pathname;
      if (path === "/record_dashboard") {
        setPage(1);
      }
      if (userId && !username) {
        router.push("/member/new/profile");
      }
    }
  }, [userId, username]);

  // 登入與註冊頁不顯示 Navbar
  if (router.pathname === "/login" || router.pathname === "/signup") {
    return <></>;
  }

  return (
    <nav className="fixed top-0 z-50 w-[100%] border-b border-stroke bg-white">
      <div className="outer grid grid-cols-3 pl-8 pr-6 h-16">
        {/* Logo 連結 */}
        <Link href="/test" className="col-span-1 flex items-center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            priority={false}
            width={32}
            height={32}
          />
          <Image
            src="/images/logo-text.svg"
            alt="logo-text"
            priority={false}
            width={0}
            height={0}
            className="ml-2 w-auto h-6"
          />
        </Link>
        {/* 頁面連結 */}
        {username && (
          <div className="col-span-1 flex justify-center h-16">
            <div className="relative flex justify-center">
              <Link
                href="/"
                className="flex gap-2 px-8 pt-6 pb-5"
                onClick={() => setPage(0)}
              >
                <IconHome />
                社群首頁
              </Link>
              <Link
                href="/record_dashboard"
                className="flex gap-2 px-8 pt-6 pb-5"
                onClick={() => setPage(1)}
              >
                <IconBrandGoogleAnalytics />
                數據紀錄
              </Link>
              <div className={sliderStyle}></div>
            </div>
          </div>
        )}
        {/* 個人資訊按鈕 */}
        {isLoggedIn ? (
          <BurgerMenu
            headShot={headShot}
            username={username}
            handleLogout={() => handleLogout()}
          />
        ) : (
          <div className="col-start-3 flex justify-end items-center gap-3 text-link font-semibold">
            <Link href="/login" className="hover:scale-110 duration-100">
              登入
            </Link>
            <Link href="/signup" className="hover:scale-110 duration-100">
              註冊
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
