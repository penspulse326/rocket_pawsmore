import Image from "next/image";
import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import PetCards from "@/components/social/PetCards";

const SideBarLeft = () => {
  return (
    <aside className="col-span-3 flex flex-col py-8 h-full">
      <PetCards />
      {/* 個人連結 */}
      <Link
        href="#"
        className="flex gap-4 p-4 border border-stroke bg-white  rounded-[30px] duration-300 hover:bg-stroke"
      >
        <Image
          src="/test/user-chichi.png"
          width={48}
          height={48}
          alt="user"
          className="rounded-full"
        />
        <div>
          <p>琪琪</p>
          <p className="text-note">@chichi1992126</p>
        </div>
      </Link>
      {/* 選單 */}
    </aside>
  );
};

export default SideBarLeft;
