import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SocialSideBarLeft() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <aside className="col-span-3 flex flex-col pt-8 h-full">
      {/* 寵物列表 */}
      <div className="flex-grow">
        {/* 寵物卡片 */}
        <div className="flex flex-col gap-4 mx-auto p-4 max-w-[204px] border border-stroke rounded-[30px] bg-white">
          <Image
            src="/test/photo-cat-test.png"
            width={172}
            height={172}
            priority
            alt="寵物照片"
            className="rounded-[30px] object-cover"
          />
          <div>
            <p>角龍寶寶</p>
            <p>@littleprincess126</p>
          </div>
          <Link
            href="#"
            className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center hover:bg-primary/70 duration-300"
          >
            寵物檔案
          </Link>
        </div>
      </div>
    </aside>
  );
}
