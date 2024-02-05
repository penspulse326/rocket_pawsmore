import Image from "next/image";
import Link from "next/link";

import PetCards from "@/containers/social/sideBar/PetCards";
import MoreMenu from "@/containers/social/sideBar/MoreMenu";

const userData = {
  id: "123",
  username: "琪琪",
  account: "chichi1992126",
  photoUrl: "/test/user-chichi.png",
};

const LeftBar: React.FC = () => {
  const { photoUrl, username, account } = userData;
  return (
    <aside className="col-span-3 flex flex-col py-8 h-full">
      {/* 寵物檔案卡片 */}
      <PetCards />
      {/* 個人連結 */}
      <Link
        href="#"
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke"
      >
        <Image
          src={photoUrl}
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
