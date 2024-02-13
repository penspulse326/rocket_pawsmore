import { IconHeart, IconDotsVertical } from "@tabler/icons-react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Mask from "../../components/hint/Mask";
import PostView from "../../components/social/PostView";
import InputComment from "@/components/social/InputComment";

const Card: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-8 border border-stroke rounded-[32px]">
      <section className="relative">
        {isMaskOpen && (
          <Mask setIsOpen={setIsMaskOpen} maskType="post">
            <PostView />
          </Mask>
        )}
        <Image
          src="/test/post-dog-1.png"
          alt="貼文照片"
          width={528}
          height={528}
          priority={false}
          onClick={() => setIsMaskOpen(true)}
          className="rounded-[26px]"
        />
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
              src="/test/photo-dog-test.png"
              width={48}
              height={48}
              alt="發文者頭貼"
              className="rounded-full"
            />
          </Link>
          <Link href="#" className="font-bold">
            charliepangpang
          </Link>
          <span className="w-[5px] h-[5px] bg-note rounded-full"></span>
          <Link href="#" className="text-note">
            3小時
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
        <p>我是查理胖胖我超胖！</p>
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
