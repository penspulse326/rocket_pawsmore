import Image from "next/image";
import Link from "next/link";

const MorePostHint: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-4 my-16 text-center">
      <Image
        src="/icons/icon-paw-gradient.svg"
        width={162}
        height={162}
        alt="no content"
      />
      <div>
        <p className="text-2xl">沒有其他新動態了</p>
        <p className="text-note">你已看完所有追蹤中的貼文</p>
      </div>
      <p>
        瞧瞧我們的{" "}
        <Link href="/test/explore" className="text-primary font-bold">
          探索
        </Link>{" "}
        或是繼續往下瀏覽{" "}
        <Link href="#" className="text-primary font-bold">
          熱門貼文
        </Link>
      </p>
    </section>
  );
};

export default MorePostHint;
