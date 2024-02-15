import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";

const PostMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        className="relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onBlur={() => setIsMenuOpen(false)}
      >
        <IconDotsVertical />
        {isMenuOpen && (
          <ul className="absolute right-0 mt-2 p-3 w-28 rounded-3xl bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)]">
            <li>
              <button type="button" className="px-3 py-1">
                複製連結
              </button>
            </li>
            <li>
              <button type="button" className="px-3 py-1 text-error">
                檢舉貼文
              </button>
            </li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default PostMenu;
