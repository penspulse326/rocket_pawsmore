import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IconHome, IconBrandGoogleAnalytics } from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { clearUserInfo } from "@/common/redux/userInfoSlice";

import BurgerMenu from "./BurgerMenu";

const Navbar: React.FC = () => {
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

  const handleLogout = () => {
    dispatch(clearUserInfo());
    router.push("/login");
  };

  // 保護路由 驗證使用者是否登入 再決定要不要跳轉
  // const router = useRouter();
  // useEffect(() => {
  //   if ((!userId && router.pathname === "/signup") || "/login") {
  //     return;
  //   }
  //   if (!userId) {
  //     router.push("/login");
  //   } else if (!username) {
  //     router.push("/member/new/create_profile");
  //   } else {
  //     router.push("/social");
  //   }
  // }, [userId, username]);

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
