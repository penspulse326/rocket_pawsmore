import { IconMenu2 } from "@tabler/icons-react";

import Link from "next/link";
import { useState } from "react";

const MoreMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
  );
};

export default MoreMenu;
