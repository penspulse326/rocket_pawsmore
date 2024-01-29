import Image from "next/image";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";

export default function SocialSideBarRight() {
  return (
    <div className="col-span-3 bg-white">
      <section className="flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-stroke">
        <input
          type="text"
          placeholder="搜尋名稱、分類⋯⋯"
          className="w-full outline-none bg-transparent"
        />
        <IconSearch size={24} />
      </section>
      <section className="mt-8">
        <h2 className="text-note">為您推薦</h2>
        <ul className="flex flex-col gap-6 mt-4">
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#">
                <Image
                  src="/test/photo-cat-test-2.png"
                  width={48}
                  height={48}
                  alt="user-photo"
                  className="rounded-full"
                />
              </Link>
              <Link href="#">
                <p>黑角龍</p>
                <p>@blk_diablos</p>
              </Link>
            </div>
            <button
              type="button"
              className="px-8 py-2 rounded-[30px] bg-primary text-white"
            >
              追蹤
            </button>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#">
                <Image
                  src="/test/photo-dog-test-2.png"
                  width={48}
                  height={48}
                  alt="user-photo"
                  className="rounded-full"
                />
              </Link>
              <Link href="#">
                <p>陳嘟嘟</p>
                <p>@duduchen123</p>
              </Link>
            </div>
            <button
              type="button"
              className="px-8 py-2 rounded-[30px] bg-primary text-white"
            >
              追蹤
            </button>
          </li>
        </ul>
        <h2 className="mt-8 text-note">探索</h2>
        <div className="mt-4 px-5 text-center">
          <div className="flex gap-4">
            <Link href="/test/social/explore?type=dog">
              <Image
                src="/test/photo-dog-test-1.png"
                width={80}
                height={80}
                alt="explore dog"
                className="mb-2 rounded-full"
              />
              <span>狗</span>
            </Link>
            <Link href="#">
              <Image
                src="/test/photo-cat-test.png"
                width={80}
                height={80}
                alt="explore cat"
                className="mb-2 rounded-full"
              />
              <span>貓</span>
            </Link>
            <Link href="#">
              <Image
                src="/test/photo-rice-test.png"
                width={80}
                height={80}
                alt="explore cat"
                className="mb-2 rounded-full"
              />
              <span>倉鼠</span>
            </Link>
          </div>
          <Link href="#" className="flex flex-col items-center mt-4">
            <Image
              src="/test/photo-more.png"
              width={188}
              height={80}
              alt="explore cat"
              className="mb-2"
            />
            <span>更多</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
