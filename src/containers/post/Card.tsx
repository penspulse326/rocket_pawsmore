import { IconHeart, IconDotsVertical } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import Mask from "../../components/hint/Mask";
import PostView from "../../components/post/PostView";
import InputComment from "@/components/post/InputComment";
import { fetchGetComment } from "@/common/fetch/comment";

import type { RootState } from "@/common/redux/store";
import type { CommentDataType, PostDataType } from "@/types";
import { MediaType } from "@/common/lib/enums";

interface PropsType {
  data: PostDataType;
}

const Card: React.FC<PropsType> = ({ data }) => {
  const { token } = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    if (token) getComments();
  }, [token]);

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

  const [comments, setComments] = useState<CommentDataType[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMaskOpen, setIsMaskOpen] = useState(false);

  // 自動播放影片
  const videoRef = useRef<HTMLVideoElement>(null);
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
    const response = await fetchGetComment(token, postId);
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
            />
          </Mask>
        )}
        {/* 多媒體內容 */}
        <div className="relative max-w-[528px] max-h-[528px] aspect-square rounded-[26px] overflow-hidden">
          {mediaType === MediaType.image && (
            <Image
              src={media}
              alt={petAccount}
              priority={false}
              fill={true}
              style={{ objectFit: "cover" }}
              onClick={() => setIsMaskOpen(true)}
            />
          )}
          {mediaType === MediaType.video && (
            <video
              ref={videoRef}
              src={media}
              autoPlay={true}
              onClick={handleVideoToggle}
              onDoubleClick={handleVideoDoubleClick}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <button
          type="button"
          className="absolute bottom-8 right-8"
          onClick={() => setIsLiked(!isLiked)}
        >
          <IconHeart
            size={70}
            className={`${
              isLiked ? "fill-tertiary" : "fill-stroke"
            } stroke-white stroke-1 filter drop-shadow-md duration-300`}
          />
        </button>
      </section>
      {/* 個人資訊 */}
      <section className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link
            href="#"
            className="relative max-w-12 max-h-12 w-12 h-12 rounded-full overflow-hidden"
          >
            <Image
              src={petPhoto || "/images/default-photo.png"}
              alt={petAccount}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </Link>
          <Link href="#" className="font-bold">
            {petAccount}
          </Link>
          <span className="w-[5px] h-[5px] bg-note rounded-full"></span>
          <Link
            href="#"
            className="tooltip text-note"
            data-tooltip={moment.utc(createDate).format("YYYY-MM-DD HH:mm")}
          >
            {moment.utc(createDate).fromNow()}
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {/* 按讚數 */}
          <IconHeart fill="#808080" color="#808080" />
          <span className="text-note">{likes.length}</span>
          {/* 開啟選單 */}
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
      </section>
      {/* 內文 */}
      <p>{postContent}</p>
      {/* 留言 */}
      <section>
        <ul>
          {comments.slice(0, 2).map(({ id, userAccount, commentContent }) => (
            <li key={`${id}-${userAccount}`}>
              <span className="mr-4 font-bold">{userAccount}</span>
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
      <InputComment postId={postId} getComments={getComments} isEffect />
    </div>
  );
};

export default Card;
