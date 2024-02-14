import {
  IconChevronDown,
  IconChevronLeft,
  IconMedal,
  IconMovie,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

import List from "../milestone/List";

interface UploadViewPropsType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadView: React.FC<UploadViewPropsType> = ({ setIsOpen }) => {
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);

  return (
    <section className="grid grid-cols-10 gap-x-8 gap-y-4 p-8 max-w-[1041px] rounded-[30px] bg-white">
      <div className="col-span-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">新增貼文</h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          <IconX size={40} stroke={1} />
        </button>
      </div>
      <label className="col-span-5 flex justify-center items-center gap-8 w-[476px] border border-stroke rounded-[30px] overflow-hidden cursor-pointer">
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .mp4, "
          name="media"
          className="hidden"
        />
        <div className="flex items-center">
          <IconPhoto size={24} />
          <span className="ml-2 text-note">附上照片</span>
        </div>
        <div className="flex items-center">
          <IconMovie size={24} />
          <span className="ml-2 text-note">附上影片</span>
        </div>
      </label>
      <section className="relative col-span-5">
        {/* 文字輸入 */}
        <textarea className="scrollbar-none p-8 w-full h-[259px] border border-stroke outline-note rounded-[30px] resize-none"></textarea>
        <div className="flex gap-8 mt-8">
          <button
            type="button"
            className="flex-grow border border-stroke rounded-[30px] text-center"
            onClick={() => setIsMilestoneOpen(!isMilestoneOpen)}
          >
            <IconMedal size={48} className="mx-auto" />
            <span className="block mt-4 text-note">加上里程碑</span>
          </button>
          <div className="flex flex-col gap-8">
            <button
              type="button"
              className="flex items-center gap-2 p-2 border border-stroke rounded-full"
            >
              <Image
                src="/test/photo-cat-test.png"
                width={48}
                height={48}
                alt="角龍寶寶"
                className="rounded-full"
              />
              <div className="text-left">
                <p className="font-bold">角龍寶寶</p>
                <p className="text-note">@littleprincess126</p>
              </div>
              <IconChevronDown size={24} className="mr-3" />
            </button>
            <button
              className={`${
                isMilestoneOpen ? "bg-white" : "bg-primary"
              } py-3 w-full rounded-full  text-white text-xl font-bold`}
            >
              Pawk!
            </button>
          </div>
        </div>
        {/* 里程碑列表 */}
        {isMilestoneOpen && (
          <div className="absolute flex flex-col px-8 bg-white w-full h-full border border-stroke rounded-[30px]">
            <div className="flex items-center py-6">
              <button
                type="button"
                className="absolute"
                onClick={() => setIsMilestoneOpen(false)}
              >
                <IconChevronLeft stroke={1} size={40} />
              </button>
              <h3 className="w-full text-xl text-center">加上里程碑</h3>
            </div>
            <ul className="scrollbar-none pb-6 overflow-y-scroll">
              <List />
            </ul>
          </div>
        )}
      </section>
    </section>
  );
};

export default UploadView;
