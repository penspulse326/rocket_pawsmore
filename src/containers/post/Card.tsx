import { IconHeart, IconDotsVertical } from "@tabler/icons-react";
import moment from "moment";
import "moment/locale/zh-tw";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Mask from "../../components/hint/Mask";
import PostView from "../../components/post/PostView";
import InputComment from "@/components/post/InputComment";
import { PostDataType } from "@/types";

interface PropsType {
  data: PostDataType;
}

const Card: React.FC<PropsType> = ({ data }) => {
  moment.locale("zh-tw"); // 轉換語系

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

  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-8 border border-stroke rounded-[32px]">
      <section className="relative">
        {/* 遮罩 */}
        {isMaskOpen && (
          <Mask setIsOpen={setIsMaskOpen} maskType="post">
            <PostView data={data} />
          </Mask>
        )}
        {/* 多媒體內容 */}
        <div
          onClick={() => setIsMaskOpen(true)}
          className="relative max-w-[528px] max-h-[528px] aspect-square rounded-[26px] overflow-hidden"
        >
          <Image
            src={media}
            alt={petAccount}
            priority={false}
            fill={true}
            style={{ objectFit: "cover" }}
          />
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
          <Link href="#">
            <Image
              src={petPhoto || "/images/default-photo.png"}
              width={48}
              height={48}
              alt={petAccount}
              className="rounded-full"
            />
          </Link>
          <Link href="#" className="font-bold">
            {petAccount}
          </Link>
          <span className="w-[5px] h-[5px] bg-note rounded-full"></span>
          <Link
            href="#"
            className="tooltip text-note"
            data-tooltip={moment(createDate).format("YYYY-MM-DD HH:mm")}
          >
            {moment(createDate).fromNow()}
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <IconHeart fill="#808080" color="#808080" />
          <span className="text-note">234</span>
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
      <section>
        <p>{postContent}</p>
      </section>
      {/* 留言 */}
      <section>
        <div>
          <span className="mr-4 font-bold">rami7573</span>
          <span>好想吃一口他的臉臉</span>
        </div>
        <div>
          <span className="mr-4 font-bold">qetree_0209</span>
          <span>超可愛⋯⋯</span>
        </div>
        <button
          type="button"
          onClick={() => setIsMaskOpen(true)}
          className="mt-1 text-note"
        >
          查看所有留言
        </button>
      </section>
      <InputComment isEffect />
    </div>
  );
};

export default Card;
