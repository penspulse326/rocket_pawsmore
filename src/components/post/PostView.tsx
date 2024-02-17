import {
  IconHeart,
  IconMessageCircle,
  IconDotsVertical,
} from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import InputComment from "./InputComment";
import PostMenu from "./PostMenu";
import CommentMenu from "./CommentMenu";

import type { RootState } from "@/common/redux/store";
import type { CommentDataType, PostDataType } from "@/types";
import { MediaType } from "@/types/enums";
import LikeBtn from "./LikeBtn";

interface PropsType {
  data: PostDataType;
  comments: CommentDataType[];
  getComments: () => void;
  toggleLike: () => void;
}

const PostView: React.FC<PropsType> = ({
  data,
  comments,
  getComments,
  toggleLike,
}) => {
  const { token, userId } = useSelector((state: RootState) => state.userInfo);

  const {
    petId,
    postId,
    petAccount,
    petPhoto,
    postContent,
    media,
    mediaType,
    likes,
    createDate,
  } = data;

  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(-1);
  const scrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (token) getComments();
  }, [token]);

  // 檢查是否按過讚
  useEffect(() => {
    const isLiked = likes.find((like) => like.userId === userId);
    if (isLiked) setIsLiked(true);
    else setIsLiked(false);
  }, [likes]);

  return (
    <section className="flex gap-8 p-8 rounded-[32px] bg-white">
      {/* 多媒體區 */}
      <section className="relative max-w-[530px] max-h-[530px] w-[530px] h-[530px] rounded-[26px] overflow-hidden">
        {mediaType === MediaType.image && (
          <Image
            src={media}
            alt={petAccount}
            priority={false}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        )}
        {mediaType === MediaType.video && (
          <video
            src={media}
            controls={true}
            autoPlay={true}
            className="w-full h-full object-contain"
          />
        )}
        {/* 按讚 */}
        <LikeBtn isLiked={isLiked} onClick={toggleLike} />
      </section>
      {/* 文字區 */}
      <section>
        <div className="flex justify-between mt-1 mb-4">
          {/* 個人資訊 */}
          <div className="flex gap-2 items-center">
            <Link
              href={`/pet/${petAccount}`}
              className="relative max-w-12 max-h-12 w-12 h-12 rounded-full overflow-hidden"
            >
              <Image
                src={petPhoto || "/images/default-photo.png"}
                alt={petAccount}
                priority={false}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <Link href={`/pet/${petAccount}`} className="font-bold">
              {petAccount}
            </Link>
            <span className="w-1 h-1 bg-note rounded-full"></span>
            <span
              className="tooltip text-note text-nowrap"
              data-tooltip={moment(createDate).format("YYYY-MM-DD HH:mm")}
            >
              {moment(createDate).fromNow()}
            </span>
          </div>
          {/* 選單 */}
          <PostMenu />
        </div>
        <section className="scrollbar-none overflow-y-scroll max-w-[411px] max-h-[353px] w-[411px] h-full">
          {/* 貼文內容 */}
          <p className="mt-4 break-words">{postContent}</p>
          {/* 留言列表 */}
          <ul className="flex flex-col gap-4 mt-8">
            {comments.map(
              (
                {
                  id,
                  userId,
                  userPhoto,
                  userAccount,
                  commentContent,
                  createDate,
                },
                index
              ) => (
                <li
                  key={`${id}${userAccount}`}
                  ref={index === comments.length - 1 ? scrollRef : null}
                  className="relative flex items-start gap-4"
                  onMouseEnter={() => setHoveredCommentIndex(index)}
                  onMouseLeave={() => setHoveredCommentIndex(-1)}
                >
                  <Link href="#" className="shrink-0">
                    <Image
                      src={userPhoto || "/images/default-photo.png"}
                      width={32}
                      height={32}
                      alt={userAccount}
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </Link>
                  <div className="flex-grow mr-8">
                    <Link
                      href={`/member/${userAccount}`}
                      className="mr-2 font-bold"
                    >
                      {userAccount}
                    </Link>
                    <span
                      className="tooltip text-note"
                      data-tooltip={moment.utc(createDate).format("YYYY-MM-DD")}
                    >
                      {moment.utc(createDate).fromNow()}
                    </span>
                    <p>{commentContent}</p>
                  </div>
                  {hoveredCommentIndex === index && (
                    <CommentMenu
                      authorId={userId}
                      postId={postId}
                      commentId={id}
                      getComments={getComments}
                    />
                  )}
                </li>
              )
            )}
          </ul>
        </section>
        {/* 按讚數與留言數 */}
        <div className="flex gap-4 my-4 text-note">
          <span className="flex items-center">
            <IconHeart className="mr-2 fill-note stroke-note" />
            {likes.length}
          </span>
          <span className="flex items-center">
            <IconMessageCircle className="mr-2 stroke-note" />
            {comments.length}
          </span>
        </div>
        <InputComment postId={postId} getComments={getComments} />
      </section>
    </section>
  );
};

export default PostView;
