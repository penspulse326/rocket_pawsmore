import { IconHeart, IconDotsVertical } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import Mask from "../../../components/hint/Mask";
import PostView from "../../../components/post/PostView";
import InputComment from "@/components/post/InputComment";
import { fetchGetComment } from "@/common/fetch/comment";

import type { RootState } from "@/common/redux/store";
import type { CommentDataType, PostDataType } from "@/types";
import { MediaType } from "@/common/lib/enums";
import LikeBtn from "@/components/post/LikeBtn";
import { fetchLikePost } from "@/common/fetch/post";
import Menu from "./Menu";
import { fetchCheckAuth } from "@/common/fetch/auth";

interface PropsType {
  data: PostDataType;
  getList: () => void;
}

const Card: React.FC<PropsType> = ({ data, getList }) => {
  const { token, userId } = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    getComments();
  }, [data]);

  const {
    userId: authorId,
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

  const [comments, setComments] = useState<CommentDataType[]>([]);
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 檢查是否按過讚
  useEffect(() => {
    const isLiked = likes.find((like) => like.userId === userId);
    if (isLiked) setIsLiked(true);
    else setIsLiked(false);
  }, [likes]);

  // 自動播放影片
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      {
        threshold: 1, // 調整此值以更改觸發播放的時間
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const getComments = async () => {
    const response = await fetchGetComment(postId);
    if (response.ok) setComments(response.data);
  };

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoDoubleClick = () => {
    videoRef.current?.pause();
    setIsMaskOpen(true);
  };

  const handleLikeToggle = async () => {
    if (!token) {
      alert("請先登入");
      return;
    }

    setIsLiked(!isLiked);

    const auth = await fetchCheckAuth(token);
    if (!auth.ok) {
      alert("登入狀態過期，請重新登入");
      return;
    }

    const response = await fetchLikePost(token, postId);
    if (response.ok) getList();
  };

  const handleDeletePost = async () => {
    console.log("delete");
  };

  return (
    <div className="flex flex-col gap-4 p-8 border border-stroke rounded-[32px]">
      <section className="relative">
        {/* 遮罩 */}
        {isMaskOpen && (
          <Mask setIsOpen={setIsMaskOpen} maskType="post">
            <PostView
              data={data}
              comments={comments}
              getComments={getComments}
              toggleLike={handleLikeToggle}
            />
          </Mask>
        )}
        {/* 多媒體內容 */}
        <div className="relative max-w-[528px] max-h-[528px] aspect-square rounded-[26px] overflow-hidden">
          {mediaType === MediaType.image && (
            <Image
              src={media}
              alt={petAccount}
              priority={true}
              onClick={() => setIsMaskOpen(true)}
              fill={true}
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="w-auto h-auto cursor-pointer"
            />
          )}
          {mediaType === MediaType.video && (
            <video
              ref={videoRef}
              src={media}
              autoPlay={true}
              onClick={handleVideoToggle}
              onDoubleClick={handleVideoDoubleClick}
              className="w-full h-full bg-black object-contain cursor-pointer"
            />
          )}
        </div>
        {/* 按讚按鈕 */}
        <LikeBtn isLiked={isLiked} onClick={handleLikeToggle} />
      </section>
      {/* 寵物資訊 */}
      <section className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link
            href={`/pet/${petAccount}`}
            className="relative max-w-12 max-h-12 w-12 h-12 rounded-full overflow-hidden"
          >
            <Image
              src={petPhoto || "/images/default-photo.png"}
              alt={petAccount}
              fill={true}
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="w-auto h-auto"
            />
          </Link>
          <Link href={`/pet/${petAccount}`} className="font-bold">
            {petAccount}
          </Link>
          <span className="w-1 h-1 bg-note rounded-full"></span>
          <span
            className="tooltip text-note"
            data-tooltip={moment.utc(createDate).format("YYYY-MM-DD HH:mm")}
          >
            {moment.utc(createDate).fromNow()}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {/* 按讚數 */}
          <IconHeart fill="#808080" color="#808080" />
          <span className="text-note">{likes.length}</span>
          {/* 開啟選單 */}
          <Menu
            postId={postId}
            isAuthor={userId === authorId}
            media={media}
            mediaType={mediaType}
          />
        </div>
      </section>
      {/* 內文 */}
      <p>{postContent}</p>
      {/* 留言 */}
      <section>
        <ul>
          {comments.slice(0, 2).map(({ id, userAccount, commentContent }) => (
            <li key={`${id}-${userAccount}`}>
              <Link href={`/member/${userAccount}`} className="mr-4 font-bold">
                {userAccount}
              </Link>
              <span>{commentContent}</span>
            </li>
          ))}
        </ul>
        {comments.length > 2 && (
          <button
            type="button"
            onClick={() => setIsMaskOpen(true)}
            className="mt-1 text-note"
          >
            查看所有留言
          </button>
        )}
      </section>
      {token && (
        <InputComment postId={postId} getComments={getComments} isEffect />
      )}
    </div>
  );
};

export default Card;
