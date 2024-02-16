import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";

interface PropsType {
  postId: number;
  isAuthor: boolean;
}

const Menu: React.FC<PropsType> = ({ postId, isAuthor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeletePost = async () => {
    console.log("delete");
  };

  return (
    <button
      type="button"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative"
    >
      <IconDotsVertical />
      {isMenuOpen && (
        <ul className="absolute right-0 mt-2 p-3 w-28 rounded-3xl bg-white shadow-custom">
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
          {isAuthor && (
            <li>
              <button
                type="button"
                onClick={handleDeletePost}
                className="px-3 py-1 text-error"
              >
                刪除貼文
              </button>
            </li>
          )}
        </ul>
      )}
    </button>
  );
};

export default Menu;
