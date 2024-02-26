import { IconHeart } from "@tabler/icons-react";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import Mask from "../../../components/hint/Mask";
import PostView from "../../../components/post/PostView";
import InputComment from "@/components/comment/InputComment";
import { fetchGetComment } from "@/common/fetch/comment";

import type { RootState } from "@/common/redux/store";
import type { CommentDataType, PostDataType } from "@/types";
import { MediaType } from "@/types/enums";
import LikeBtn from "@/components/post/LikeBtn";
import Menu from "../../../components/post/PostMenu";
import CommentList from "@/components/comment/CommentList";
import { fetchGetSinglePost } from "@/common/fetch/post";

interface PropsType {
  data: PostDataType;
  getList: () => void;
}

const PostCard: React.FC<PropsType> = ({ data: initalData, getList }) => {
  const { token, userId } = useSelector((state: RootState) => state.userInfo);
  const [data, setData] = useState<PostDataType>(initalData);
  const [comments, setComments] = useState<CommentDataType[]>([]);
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const isLiked = likes.some((like) => like.userId === userId);

  const getPost = async () => {
    const response = await fetchGetSinglePost(postId);
    if (response.ok) {
      setData(response.data);
    }
  };

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

  useEffect(() => {
    getComments();
  }, [data]);

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

  return (
    <div className="flex flex-col gap-4 p-8 border border-stroke rounded-[32px]">
      <section className="relative">
        {/* 遮罩 */}
        {isMaskOpen && (
          <Mask setIsOpen={setIsMaskOpen} maskType="post">
            <PostView
              data={data}
              getPost={getPost}
              onClose={() => setIsMaskOpen(false)}
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
              muted={true}
              onClick={handleVideoToggle}
              onDoubleClick={handleVideoDoubleClick}
              className="w-full h-full bg-black object-contain cursor-pointer"
            />
          )}
        </div>
        {/* 按讚按鈕 */}
        <LikeBtn
          userId={userId}
          postId={postId}
          isLiked={isLiked}
          getPost={getPost}
        />
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
            data-tooltip={moment
              .utc(createDate)
              .tz("Asia/Taipei")
              .format("YYYY-MM-DD HH:mm")}
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
            getList={getList}
            onClose={() => setIsMaskOpen(false)}
          />
        </div>
      </section>
      {/* 內文 */}
      <p>{postContent}</p>
      {/* 留言 */}
      <CommentList
        from="postList"
        postId={postId}
        comments={comments}
        onClick={() => setIsMaskOpen(true)}
      />
      {token && (
        <InputComment postId={postId} getComments={getComments} isEffect />
      )}
    </div>
  );
};

export default PostCard;
