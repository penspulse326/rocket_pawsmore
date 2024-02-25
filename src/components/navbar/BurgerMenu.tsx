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

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  return (
    <div className="col-start-3 col-span-1 flex justify-end items-center">
      <div
        className={`${
          isMenuOpen && "shadow-custom"
        } relative w-20 border border-stroke rounded-[30px] duration-300`}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onBlur={handleBlur}
          className="flex items-center gap-2 p-2 w-full h-full"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={headShot || "/images/default-photo.png"}
              alt={username || "avatar"}
              priority={false}
              fill={true}
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
          <IconMenu2
            className={`${isMenuOpen && "rotate-90"} w-4 h-4 duration-300`}
          />
        </button>
        <ul
          className={`${
            isMenuOpen ? "tenkai-t-r" : "fuuin-t-r"
          } absolute right-0 mt-2 p-3 w-40 rounded-[24px] bg-white shadow-custom`}
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
            <Link
              href="/user_dashboard?to=profile"
              className="block px-3 py-1 w-full"
            >
              個人帳號資料
            </Link>
          </li>
          <li className="mb-2 rounded-[30px] hover:bg-secondary duration-300">
            <Link
              href="/user_dashboard?to=pet_list"
              className="block px-3 py-1 w-full"
            >
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
