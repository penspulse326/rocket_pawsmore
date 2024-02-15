import { RootState } from "@/common/redux/store";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface PropsType {
  authorId: number;
  postId: number;
  commentId: number;
}

const CommentMenu: React.FC<PropsType> = ({ authorId, postId, commentId }) => {
  const { token, userId } = useSelector((state: RootState) => state.userInfo);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleReport = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen(false);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <button
      type="button"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="absolute right-0 z-10"
    >
      <IconDotsVertical size={24} />
      {isMenuOpen && (
        <ul className="absolute right-4 bottom-4 mt-2 p-3 w-28 rounded-3xl bg-white shadow-[0_0px_10px_0_rgba(0,0,0,0.15)]">
          <li>
            <button
              type="button"
              onClick={(e) => handleReport(e)}
              className="px-3 py-1 text-error"
            >
              檢舉貼文
            </button>
          </li>
          {authorId === userId && (
            <li>
              <button
                type="button"
                onClick={(e) => handleDelete(e)}
                className="px-3 py-1 text-error"
              >
                刪除留言
              </button>
            </li>
          )}
        </ul>
      )}
    </button>
  );
};

export default CommentMenu;
