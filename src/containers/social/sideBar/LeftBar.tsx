import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { setPetList } from "@/common/redux/petListSlice";
import { fetchGetPetList } from "@/common/fetch/petProfile";

import MoreMenu from "@/containers/social/sideBar/MoreMenu";
import SwiperList from "@/components/petInfo/SwiperList";

import type { RootState } from "@/common/redux/store";

const LeftBar: React.FC = () => {
  const router = useRouter();
  const { username, account, headShot } = useSelector(
    (state: RootState) => state.userInfo
  );
  const petList = useSelector((state: RootState) => state.petList);

  const handleCheckProfile = (userAccount: string) => {
    router.push(`/member/${userAccount}`);
  };

  return (
    <aside
      style={{ height: "calc(100vh - 64px)" }}
      className="sticky top-16 flex flex-col p-8 max-w-[312px] w-full"
    >
      {/* 寵物檔案卡片 */}
      <SwiperList list={petList} />
      {/* 個人連結 */}
      <div
        onClick={() => handleCheckProfile(account)}
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke hover:cursor-pointer"
      >
        <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden">
          <Image
            src={headShot || "/images/default-photo.png"}
            alt={username}
            priority={true}
            fill={true}
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="w-auto h-auto"
          />
        </div>
        <div>
          <p>{username}</p>
          <p className="text-note">@{account}</p>
        </div>
      </div>
      {/* 選單 */}
      <MoreMenu />
    </aside>
  );
};

export default LeftBar;
