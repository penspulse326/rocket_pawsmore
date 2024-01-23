import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SocialPostList() {
  const [isInputFocus, setIsInputFocus] = useState(false);

  return (
    <div className="scrollbar-none col-span-6 p-8 border-x border-stroke bg-white overflow-y-scroll">
      {/* 貼文按鈕 */}
      <div className="px-8 pt-8 pb-6 border border-stroke rounded-[30px]">
        <input
          type="text"
          placeholder="在想些什麼呢？"
          className="px-8 py-4 w-full border border-stroke rounded-[30px] outline-none"
        />
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-8 text-note">
            <button type="button" className="flex items-center gap-2">
              <Image
                src="/icons/icon-photo.svg"
                width={24}
                height={24}
                alt="upload-photo"
              />
              附上照片
            </button>
            <button type="button" className="flex items-center gap-2">
              <Image
                src="/icons/icon-video.svg"
                width={24}
                height={24}
                alt="upload-video"
              />
              附上影片
            </button>
            <button type="button" className="flex items-center gap-2">
              <Image
                src="/icons/icon-medal.svg"
                width={24}
                height={24}
                alt="upload-milestone"
              />
              附上里程碑
            </button>
          </div>
          <button
            type="button"
            className="px-8 py-2 rounded-[30px] bg-primary text-white duration-300 hover:bg-primary/70"
          >
            Pawk!
          </button>
        </div>
      </div>
      <h2 className="mt-8 text-note">動態消息</h2>
      {/* 貼文列表 */}
      <div className="flex flex-col gap-8 mt-4 h-[2000px]">
        {/* 貼文卡片 */}
        <div className="flex flex-col gap-4 p-8 border border-stroke rounded-[32px]">
          <section className="relative">
            <Image
              src="/test/post-dog-1.png"
              alt="貼文照片"
              width={528}
              height={528}
              priority={false}
              className="rounded-[26px]"
            />
            <button type="button"></button>
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
              <span className="text-note">234</span>
              <button type="button">
                <Image
                  src="/icons/icon-more.svg"
                  width={24}
                  height={24}
                  alt="更多選項"
                />
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
            <button type="button" className="mt-1 text-note">
              查看所有留言
            </button>
          </section>
          <section
            className={`${
              isInputFocus && "px-4 py-2 border border-stroke"
            } flex gap-2 justify-between items-center rounded-[30px] duration-200`}
          >
            <div className="flex-grow flex gap-2">
              <Image
                src="/icons/icon-comment.svg"
                width={24}
                height={24}
                alt="更多選項"
              />
              <input
                type="text"
                onFocus={() => setIsInputFocus(true)}
                onBlur={() => setIsInputFocus(false)}
                className="w-full bg-transparent outline-none"
              />
            </div>
            <button
              type="button"
              className="px-4 py-[6px] rounded-[30px] bg-primary text-white"
            >
              發佈
            </button>
          </section>
        </div>
      </div>
      <h2 className="mt-8 text-note">熱門貼文</h2>
    </div>
  );
}
