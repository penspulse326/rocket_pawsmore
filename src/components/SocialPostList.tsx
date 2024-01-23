import Image from "next/image";

export default function SocialPostList() {
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
      <ul className="h-[2000px]">我是貼文列表</ul>
    </div>
  );
}
