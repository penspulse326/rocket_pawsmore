import {
  IconHeart,
  IconMessageCircle,
  IconDotsVertical,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import InputComment from "./InputComment";

import type { CommentDataType, PostDataType } from "@/types";
import moment from "moment";

interface PropsType {
  data: PostDataType;
}

const testData: CommentDataType[] = [
  {
    photoUrl: "/test/photo-dog-test.png",
    username: "oasis1991",
    content: "不要憤怒地回首過去",
    time: "2022-01-01 12:00",
  },
  {
    photoUrl: "/test/user-chichi.png",
    username: "mrafternoon",
    content: "下班了台北，清晨的紐約，我獨自走在這條街",
    time: "2022-01-02 12:00",
  },
  {
    photoUrl: "/test/photo-user-1.jpg",
    username: "ramenprince",
    content: "不快樂的事情虛驚一場，去我們不曾到過的地方",
    time: "2022-01-03 14:00",
  },
  {
    photoUrl: "/test/photo-user-2.jpg",
    username: "tarcysu1986",
    content: "追得過一切，我的愛已為你再也沒有終止線",
    time: "2022-01-03 16:00",
  },
  {
    photoUrl: "/test/photo-dog-test.png",
    username: "oasis1991",
    content: "不要憤怒地回首過去",
    time: "2022-01-01 12:00",
  },
  {
    photoUrl: "/test/user-chichi.png",
    username: "mrafternoon",
    content: "下班了台北，清晨的紐約，我獨自走在這條街",
    time: "2022-01-02 12:00",
  },
  {
    photoUrl: "/test/photo-user-1.jpg",
    username: "ramenprince",
    content: "不快樂的事情虛驚一場，去我們不曾到過的地方",
    time: "2022-01-03 14:00",
  },
  {
    photoUrl: "/test/photo-user-2.jpg",
    username: "tarcysu1986",
    content: "追得過一切，我的愛已為你再也沒有終止線",
    time: "2022-01-03 16:00",
  },
];

const PostView: React.FC<PropsType> = ({ data }) => {
  const {
    petId,
    postId,
    petAccount,
    petPhoto,
    postContent,
    media,
    mediaType,
    createDate,
  } = data;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(-1);
  const [comments, setComments] = useState(testData);
  const scrollRef = useRef<HTMLLIElement | null>(null);

  return (
    <section className="flex gap-8 p-8 rounded-[32px] bg-white">
      {/* 多媒體區 */}
      <section className="relative max-w-[530px] max-h-[530px] w-[530px] h-[530px] rounded-[26px] overflow-hidden">
        <Image
          src={media}
          alt={petAccount}
          priority={false}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        {/* 按讚 */}
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
      {/* 文字區 */}
      <section>
        <div className="flex justify-between mt-1 mb-4">
          <div className="flex gap-2 items-center">
            <Link
              href="#"
              className="relative max-w-12 max-h-12 w-12 h-12 rounded-full overflow-hidden"
            >
              <Image
                src={petPhoto || "images/default-photo.png"}
                alt={petAccount}
                priority={false}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <Link href="#" className="font-bold">
              {petAccount}
            </Link>
            <span className="w-1 h-1 bg-note rounded-full"></span>
            <Link
              href="#"
              className="tooltip text-note text-nowrap"
              data-tooltip={moment(createDate).format("YYYY-MM-DD HH:mm")}
            >
              {moment(createDate).fromNow()}
            </Link>
          </div>
          <div className="flex gap-2 items-center">
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
        </div>
        <section className="scrollbar-none overflow-y-scroll w-[411px] max-h-[353px]">
          {/* 貼文內容 */}
          <p className="mt-4">{postContent}</p>
          {/* 留言列表 */}
          <ul className="flex flex-col gap-4 mt-8">
            {comments.map(
              (
                { photoUrl, username, content, time }: CommentDataType,
                index
              ) => (
                <li
                  key={index}
                  ref={index === comments.length - 1 ? scrollRef : null}
                  className="relative flex items-start gap-4"
                  onMouseEnter={() => setHoveredCommentIndex(index)}
                  onMouseLeave={() => setHoveredCommentIndex(-1)}
                >
                  <Link href="#" className="shrink-0">
                    <Image
                      src={`${photoUrl}`}
                      width={32}
                      height={32}
                      alt={username}
                      className="rounded-full"
                    />
                  </Link>
                  <div className="flex-grow mr-8">
                    <Link href="#" className="mr-2 font-bold">
                      {username}
                    </Link>
                    <span className="text-note">{time}</span>
                    <p>{content}</p>
                  </div>
                  {hoveredCommentIndex === index && (
                    <button type="button" className="absolute right-0">
                      <IconDotsVertical size={24} />
                    </button>
                  )}
                </li>
              )
            )}
          </ul>
        </section>
        <div className="flex gap-4 my-4 text-note">
          <span className="flex items-center">
            <IconHeart className="mr-2 fill-note stroke-note" />
            234
          </span>
          <span className="flex items-center">
            <IconMessageCircle className="mr-2 stroke-note" />
            10
          </span>
        </div>
        <InputComment />
      </section>
    </section>
  );
};

export default PostView;
