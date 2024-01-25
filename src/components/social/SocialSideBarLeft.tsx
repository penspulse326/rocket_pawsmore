import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import PetCards from "./PetCards";

export default function SocialSideBarLeft() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          className="rounded-[50%]"
        />
        <div>
          <p>琪琪</p>
          <p className="text-note">@chichi1992126</p>
        </div>
      </Link>
      {/* 選單 */}
      <div>
        <button
          type="button"
          className="relative flex items-center gap-2 mt-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onBlur={() => setIsMenuOpen(false)}
        >
          <ul
            className={`${
              isMenuOpen ? "tenkai-b-l" : "fuuin-b-l"
            } absolute bottom-10 flex flex-col mt-2 w-28 p-3 rounded-[24px] bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)] box-border`}
          >
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#" className="inline-block w-full">
                常見問答
              </Link>
            </li>
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">網站介紹</Link>
            </li>
            <li className="px-3 py-1 rounded-[30px] hover:bg-secondary duration-300">
              <Link href="#">關於我們</Link>
            </li>
          </ul>
          <IconMenu2
            className={`${isMenuOpen && "-rotate-90"} w-4 h-4 duration-300`}
          />
          更多
        </button>
      </div>
    </aside>
  );
}
