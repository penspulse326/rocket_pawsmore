import { IconHome, IconBrandGoogleAnalytics } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, resetState } from "@/common/redux/store";

import BurgerMenu from "./BurgerMenu";
import useToken from "@/common/hooks/useToken";
import { fetchCheckAuth } from "@/common/fetch/auth";
import { setUserInfo } from "@/common/redux/userInfoSlice";

const Navbar: React.FC = () => {
  const { token, clearToken } = useToken();

  useEffect(() => {
    checkLogin();
  }, [token]);

  const router = useRouter();

  const dispatch = useDispatch();
  const { headShot, username } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [page, setPage] = useState(0);

  const sliderStyle = `${
    page ? "slide-r" : "slide-l"
  } absolute left-0 bottom-0 w-[50%] h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]
`;

  const checkLogin = async () => {
    if (!token) return;
    const response = await fetchCheckAuth(token);
    if (!response.ok) {
      alert("登入狀態過期，請重新登入");
    }
    dispatch(setUserInfo({ ...response.data, token }));
  };

  const handleLogout = () => {
    dispatch(resetState());
    clearToken();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-[100vw] border-b border-stroke bg-white">
      <div className="outer grid grid-cols-3 pl-8 pr-6 h-16">
        {/* Logo 連結 */}
        <Link href="/" className="col-span-1 flex items-center">
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
        <div className="col-span-1 flex justify-center h-16">
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
        {/* 個人資訊按鈕 */}
        <BurgerMenu
          headShot={headShot}
          username={username}
          handleLogout={() => handleLogout()}
        />
      </div>
    </nav>
  );
};

export default Navbar;
