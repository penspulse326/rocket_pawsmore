import Image from "next/image";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";

import Recommend from "./Recommend";

const RightBar: React.FC = () => {
  return (
    <aside className="col-span-3 flex flex-col gap-8 bg-white">
      <section className="flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-stroke">
        <input
          type="text"
          placeholder="搜尋名稱、分類⋯⋯"
          className="w-full outline-none bg-transparent"
        />
        <IconSearch size={24} />
      </section>
      <Recommend />
      <section>
        <h2 className=" text-note">探索</h2>
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
    </aside>
  );
};

export default RightBar;