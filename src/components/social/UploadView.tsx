import { IconMedal, IconX } from "@tabler/icons-react";

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
        <label className="w-[476px] h-[476px] border border-stroke rounded-[30px]"></label>
        <section className="w-[469px]">
          <textarea className="w-full h-[259px] border border-stroke rounded-[30px]"></textarea>
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="flex-grow flex flex-col items-center gap-4 py-8 max-w-[187px] border border-stroke rounded-[30px]"
            >
              <IconMedal size={48} />
              <span className="text-note">加上里程碑</span>
            </button>
            <div>
              <button type="button">
                <Image
                  src="/test/photo-cat-test.png"
                  width={48}
                  height={48}
                  alt="角龍寶寶"
                  className="rounded-full"
                />
              </button>
              <button className="py-3 rounded-full bg-primary text-white font-bold">
                Pawk!
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
