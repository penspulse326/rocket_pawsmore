import { IconHeart, IconMessageCircle } from "@tabler/icons-react";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CommentList from "../comment/CommentList";
import InputComment from "../comment/InputComment";
import PostMenu from "./PostMenu";
import LikeBtn from "./LikeBtn";
import { fetchGetComment } from "@/common/fetch/comment";

import type { RootState } from "@/common/redux/store";
import type { CommentDataType, PostDataType } from "@/types";
import { MediaType } from "@/types/enums";
import CardData from "./CardData";

interface PropsType {
  data: PostDataType;
  getPost: () => void;
  onClose: () => void;
}

const PostView: React.FC<PropsType> = ({ data, getPost, onClose }) => {
  const { userId } = useSelector((state: RootState) => state.userInfo);
  const [postData, setPostData] = useState<PostDataType>(data);
  const [comments, setComments] = useState<CommentDataType[]>([]);

  const {
    userId: authorId,
    postId,
    petAccount,
    petPhoto,
    postContent,
    media,
    mediaType,
    likes,
    createDate,
    dailyRecordData,
    medicalRecordData,
    momentData,
  } = postData;

  const isLiked = likes.some((like) => like.userId === userId);

  const getComments = async () => {
    const response = await fetchGetComment(postId);
    if (response.ok) setComments(response.data);
  };

  // 讀取留言
  useEffect(() => {
    if (data) {
      setPostData(data);
      getComments();
    }
  }, [data]);

  return (
    <section className="flex gap-8 p-8 max-h-[594px] h-full rounded-[32px] bg-white">
      {/* 多媒體區 */}
      <section className="relative max-w-[530px] max-h-[530px] w-[530px] h-[530px] rounded-[30px] overflow-hidden">
        {mediaType === MediaType.image && (
          <Image
            src={media}
            alt={petAccount}
            priority={false}
            fill={true}
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="w-auto h-auto"
          />
        )}
        {mediaType === MediaType.video && (
          <video
            src={media}
            controls={true}
            autoPlay={true}
            className="w-full h-full bg-black object-contain"
          />
        )}
        {/* 按讚 */}
        <LikeBtn
          userId={userId}
          postId={postId}
          isLiked={isLiked}
          getPost={getPost}
        />
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
              className="tooltip text-note text-nowrap"
              data-tooltip={moment(createDate).format("YYYY-MM-DD HH:mm")}
            >
              {moment(createDate).fromNow()}
            </span>
          </div>
          {/* 選單 */}
          <PostMenu
            postId={postId}
            isAuthor={userId === authorId}
            media={media}
            mediaType={MediaType.image}
            getList={getPost || (() => {})}
            onClose={onClose}
          />
        </div>
        <section className="scrollbar-none overflow-y-scroll max-w-[411px] max-h-[353px] w-[411px] h-full">
          {/* 貼文內容 */}
          <p className="mt-4 break-words whitespace-pre-wrap">{postContent}</p>
          {/* 額外卡片資料 */}
          <CardData
            data={dailyRecordData || medicalRecordData || momentData || null}
          />
          {/* 留言列表 */}
          <CommentList
            from="postView"
            postId={postId}
            comments={comments}
            getComments={getComments}
          />
        </section>
        {/* 按讚數與留言數 */}
        <div className="flex gap-4 my-4 text-note">
          <span className="flex items-center">
            <IconHeart className="mr-2 fill-note stroke-note" />
            {likes.length}
          </span>
          <span className="flex items-center">
            <IconMessageCircle className="mr-2 stroke-note" />
            {comments?.length}
          </span>
        </div>
        <InputComment postId={postId} getComments={getComments} />
      </section>
    </section>
  );
};

export default PostView;
