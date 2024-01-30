import Link from "next/link";

interface MenuPropsType {
  isMenuOpen: boolean;
  userId: string;
  handleLogout: () => void;
}

const Menu: React.FC<MenuPropsType> = ({
  isMenuOpen,
  userId,
  handleLogout,
}) => {
  console.log(isMenuOpen);
  return (
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
  );
};

export default Menu;
