import { fetchDeleteComment } from "@/common/fetch/comment";
import useToken from "@/common/hooks/useToken";
import { RootState } from "@/common/redux/store";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface PropsType {
  authorId: number;
  postId: number;
  commentId: number;
  getComments: () => void;
}

const CommentMenu: React.FC<PropsType> = ({
  authorId,
  postId,
  commentId,
  getComments,
}) => {
  const { token } = useToken();
  const { userId } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleReport = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen(false);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    if (isLoading || !token) {
      return;
    }

    event.stopPropagation();
    setIsLoading(true);

    const response = await fetchDeleteComment(token, postId, commentId);
    if (!response.ok) {
      alert("刪除留言失敗，請稍後再試");
      return;
    }

    getComments();
    setIsLoading(false);
    setIsMenuOpen(false);
  };

  return (
    <div
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="absolute right-0 z-10 cursor-pointer"
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
    </div>
  );
};

export default CommentMenu;
