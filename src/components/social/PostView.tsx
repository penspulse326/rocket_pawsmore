import { IconHeart, IconDotsVertical } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PostView() {
  const resouse_type = "image";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className="flex gap-8 p-8 rounded-[32px] bg-white">
      {/* 多媒體區 */}
      <section className="max-w-[530px] max-h-[530px] rounded-[26px] overflow-hidden">
        {resouse_type === "image" && (
          <Image
            src="/test/post-dog-1.png"
            width={530}
            height={530}
            alt="貼文照片"
          />
        )}
      </section>
      {/* 文字區 */}
      <section>
        <div className="flex justify-between mt-1 w-[411px]">
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
        <p className="mt-4">我是查理胖胖我超胖！</p>
        <ul className="mt-8">
          <li></li>
        </ul>
      </section>
    </section>
  );
}
