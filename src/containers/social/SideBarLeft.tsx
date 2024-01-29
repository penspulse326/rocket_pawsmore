import Image from "next/image";
import Link from "next/link";

import PetCards from "@/components/social/PetCards";
import More from "@/components/social/menu/More";

const userData = {
  id: "123",
  username: "琪琪",
  account: "chichi1992126",
  photoUrl: "/test/user-chichi.png",
};

const SideBarLeft = () => {
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
          src={`${userData.photoUrl}`}
          alt={`${userData.username}`}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p>{userData.username}</p>
          <p className="text-note">{userData.account}</p>
        </div>
      </Link>
      {/* 選單 */}
      <More />
    </aside>
  );
};

export default SideBarLeft;
