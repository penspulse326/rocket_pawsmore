import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import type { RootState } from "@/common/redux/store";
import { fetchGetPetList } from "@/common/fetch/petProfile";

import MoreMenu from "@/containers/social/sideBar/MoreMenu";
import PetCards from "@/components/petCards";

import type { PetDataType } from "@/types";

const LeftBar: React.FC = () => {
  const { userId, username, account, headShot, token } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [data, setData] = useState<PetDataType[]>([]);

  useEffect(() => {
    if (userId) handleGetPetList();
  }, [userId]);

  const handleGetPetList = async () => {
    if (userId) {
      const result = await fetchGetPetList(userId, token);
      result.data && setData(result.data);
    }
  };

  return (
    <aside className="col-span-3 flex flex-col py-8 h-full">
      {/* 寵物檔案卡片 */}
      <PetCards list={data} />
      {/* 個人連結 */}
      <Link
        href="/user_profile"
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke"
      >
        <Image
          src={headShot || "/images/default-photo.png"}
          alt={username}
          width={48}
          height={48}
          className="rounded-full"
        />
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
