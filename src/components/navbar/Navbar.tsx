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
  const router = useRouter();
  const { token: localToken, clearUser } = useToken();
  const dispatch = useDispatch();
  const { headShot, username, userId, token } = useSelector(
    (state: RootState) => state.userInfo
  );

  const checkIsLogin = async () => {
    if (!localToken) {
      router.push("/login");
      return;
    }

    // token 過期重新導向
    const response = await fetchCheckAuth(localToken);
    if (!response.ok) {
      clearUser();
      alert("登入狀態過期，請重新登入");
      router.push("/login");
      return;
    }

    dispatch(setUserInfo({ ...response.data, token: localToken }));
    const { username } = response.data;

    // username 不存在表示未完成個人資料的填寫，要重新導向
    if (!username) {
      router.push("/member/new/profile");
      return;
    }
  };

  const getPetList = async () => {
    if (!userId) {
      return;
    }
    const response = await fetchGetPetList(userId);
    const data = response.data;
    if (data) {
      dispatch(setPetList(data));
    }
  };

  const handleLogout = () => {
    clearUser();
    dispatch(resetState());
    router.push("/login");
  };

  // 本地有 token 但 redux 沒有時表示使用者是重新整理或離開網站再進入該頁面
  useEffect(() => {
    if (localToken && !token) {
      checkIsLogin();
      return;
    }
  }, [token, localToken]);

  useEffect(() => {
    if (userId) {
      getPetList();
    }
  }, [userId]);

  // 滑動條邏輯
  const [page, setPage] = useState(0);
  const sliderStyle = `${
    page ? "slide-r" : "slide-l"
  } absolute left-0 bottom-0 w-[50%] h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]
`;

  // 登入註冊頁面不顯示
  if (router.pathname === "/login" || router.pathname === "/signup") {
    return <></>;
  }

  return (
    <nav className="fixed top-0 z-50 w-[100%] border-b border-stroke bg-white text-black">
      <div className="outer grid grid-cols-3 pl-8 pr-6 h-16">
        {/* Logo 連結 */}
        <Link href="/" className="col-span-1 flex items-center">
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
        <div className="col-span-1 flex justify-center h-16">
          {username && (
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
          )}
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
