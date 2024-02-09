import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MenuPropsType {
  username: string;
  headShot: string;
  handleLogout: () => void;
}

const Menu: React.FC<MenuPropsType> = ({
  headShot,
  username,
  handleLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="col-span-1 flex justify-end items-center">
      <div
        className={`${
          isMenuOpen && "shadow-custom"
        } relative col-span-1 w-20 border border-stroke rounded-[30px] duration-300`}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onBlur={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 p-2 w-full h-full"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={headShot || "/images/default-photo.png"}
              alt={username}
              width={100}
              height={100}
              className="w-full h-full scale-110"
            />
          </div>
          <IconMenu2
            className={`${isMenuOpen && "rotate-90"} w-4 h-4 duration-300`}
          />
        </button>
        <ul
          className={`${
            isMenuOpen ? "tenkai-t-r" : "fuuin-t-r"
          } absolute right-0 mt-2 p-3 w-40 rounded-[24px] bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)]`}
        >
          <li className="rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="block px-3 py-1 w-full">
              訊息
            </Link>
          </li>
          <li className="rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="block px-3 py-1  w-full">
              通知
            </Link>
          </li>
          <li className="mb-2 rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="block px-3 py-1 w-full">
              按過喜歡的貼文
            </Link>
          </li>
          <li className="rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="block px-3 py-1 w-full">
              個人帳號資料
            </Link>
          </li>
          <li className="mb-2 rounded-[30px] hover:bg-secondary duration-300">
            <Link href="#" className="block px-3 py-1 w-full">
              寵物基本資料
            </Link>
          </li>
          <li className="rounded-[30px] hover:bg-secondary duration-300">
            <button
              type="button"
              onClick={handleLogout}
              className="block px-3 py-1 w-full text-left"
            >
              登出
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
