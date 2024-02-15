import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPetList } from "@/common/redux/petListSlice";
import { fetchGetPetList } from "@/common/fetch/petProfile";

import MoreMenu from "@/containers/social/sideBar/MoreMenu";
import SwiperList from "@/components/petInfo/SwiperList";

import type { RootState } from "@/common/redux/store";

const LeftBar: React.FC = () => {
  const dispatch = useDispatch();
  const { userId, username, account, headShot, token } = useSelector(
    (state: RootState) => state.userInfo
  );
  const petList = useSelector((state: RootState) => state.petList);

  useEffect(() => {
    handleGetPetList();
  }, [userId]);

  const handleGetPetList = async () => {
    if (userId) {
      const result = await fetchGetPetList(userId, token);
      dispatch(setPetList(result.data));
    }
  };

  return (
    <aside className="col-span-3 flex flex-col py-8 h-full">
      {/* 寵物檔案卡片 */}
      <SwiperList list={petList} />
      {/* 個人連結 */}
      <Link
        href="/user_profile"
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke"
      >
        <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden">
          <Image
            src={headShot || "/images/default-photo.png"}
            alt={username}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <p>{username}</p>
          <p className="text-note">{account}</p>
        </div>
      </Link>
      {/* 選單 */}
      <MoreMenu />
    </aside>
  );
};

export default LeftBar;
