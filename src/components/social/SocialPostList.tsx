import { useState } from "react";
import { IconPhoto, IconMovie, IconMedal } from "@tabler/icons-react";
import PostCard from "./PostCard";
import Mask from "../Mask";
import UploadView from "./UploadView";

export default function SocialPostList() {
  const testArr = [1, 2, 3];
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="scrollbar-none col-span-6 p-8 border-x border-stroke bg-white overflow-y-scroll">
      {/* 貼文按鈕 */}
      <div
        className="px-8 pt-8 pb-6 border border-stroke rounded-[30px]"
        onClick={() => setIsUploadOpen(!isUploadOpen)}
      >
        {isUploadOpen && (
          <Mask maskType="upload" setIsOpen={setIsUploadOpen}>
            <UploadView />
          </Mask>
        )}
        <input
          type="text"
          placeholder="在想些什麼呢？"
          className="px-8 py-4 w-full border border-stroke rounded-[30px] outline-none"
        />
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-8 text-note">
            <button type="button" className="flex items-center gap-2">
              <IconPhoto className="stroke-black" />
              附上照片
            </button>
            <button type="button" className="flex items-center gap-2">
              <IconMovie className="stroke-black" />
              附上影片
            </button>
            <button type="button" className="flex items-center gap-2">
              <IconMedal className="stroke-black" />
              附上里程碑
            </button>
          </div>
          <button
            type="button"
            className="px-8 py-2 rounded-[30px] bg-primary text-white font-bold"
          >
            Pawk!
          </button>
        </div>
      </div>
      <h2 className="mt-8 text-note">動態消息</h2>
      {/* 貼文列表 */}
      <div className="flex flex-col gap-8 mt-4 h-[2000px]">
        {/* 貼文卡片 */}
        {testArr.map((item, index) => (
          <PostCard key={new Date().getTime() + index} />
        ))}
      </div>
    </div>
  );
}
