import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/common/redux/store";
import { fetchCheckAuth } from "@/common/fetch/auth";
import { fetchGetSinglePost, fetchLikePost } from "@/common/fetch/post";

import type { LikesType } from "@/types";

interface PropsType {
  userId: number | null;
  postId: number;
  isLiked: boolean;
  getList?: () => void;
  getPost?: () => void;
}

const LikeBtn: React.FC<PropsType> = ({
  postId,
  isLiked,
  getList,
  getPost,
}) => {
  const { token } = useSelector((state: RootState) => state.userInfo);

  const btnStyle = isLiked ? "#FE6916" : "#EAEAEA";

  const handleLikeToggle = async () => {
    if (!token) {
      alert("請先登入");
      return;
    }

    const auth = await fetchCheckAuth(token);
    if (!auth.ok) {
      alert("登入狀態過期，請重新登入");
      return;
    }

    const response = await fetchLikePost(token, postId);

    if (response.ok) {
      getList && getList();
      getPost && getPost();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLikeToggle}
      className="absolute bottom-8 right-8"
    >
      <IconHeart
        size={70}
        fill={btnStyle}
        className="stroke-white stroke-1 filter drop-shadow-md duration-300"
      />
    </button>
  );
};

export default LikeBtn;
