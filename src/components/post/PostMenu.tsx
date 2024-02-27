import { fetchDeletePost } from "@/common/fetch/post";
import useToken from "@/common/hooks/useToken";
import { RootState } from "@/common/redux/store";
import { MediaType } from "@/types/enums";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface PropsType {
  postId: number;
  isAuthor: boolean;
  media: string;
  mediaType: MediaType;
  getList: () => void;
  onClose: () => void;
}

const Menu: React.FC<PropsType> = ({
  postId,
  isAuthor,
  media,
  mediaType,
  getList,
  onClose: handleClose,
}) => {
  const { token } = useToken();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeletePost = async () => {
    if (!token) {
      alert("請先登入");
      return;
    }
    await fetchDeletePost(token, postId, media, MediaType[mediaType]);
    getList();
    handleClose();
  };

  return (
    <div
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative cursor-pointer"
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
    </div>
  );
};

export default Menu;
