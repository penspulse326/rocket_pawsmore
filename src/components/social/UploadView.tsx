import {
  IconChevronDown,
  IconMedal,
  IconMovie,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";

import Image from "next/image";

export default function UploadView() {
  return (
    <section className="p-8 rounded-[30px] bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">新增貼文</h2>
        <button type="button">
          <IconX size={40} stroke={1} />
        </button>
      </div>
      <section className="flex gap-8 mt-4">
        <label className="flex justify-center items-center gap-8 w-[476px] border border-stroke rounded-[30px] overflow-hidden cursor-pointer">
          <input type="file" name="media" className="hidden" />
          <div className="flex items-center">
            <IconPhoto size={24} />
            <span className="ml-2 text-note">附上照片</span>
          </div>
          <div className="flex items-center">
            <IconMovie size={24} />
            <span className="ml-2 text-note">附上影片</span>
          </div>
        </label>
        <section className="w-[469px]">
          <textarea className="scrollbar-none p-8 w-full h-[259px] border border-stroke rounded-[30px]"></textarea>
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="flex-grow py-8 border border-stroke rounded-[30px] text-center"
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
              <button className="py-3 w-full  rounded-full bg-primary text-white text-xl font-bold">
                Pawk!
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
