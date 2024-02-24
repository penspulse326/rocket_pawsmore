import Image from "next/image";
import Link from "next/link";

const SelectTopic = () => {
  return (
    <section className="my-16">
      <div>
        <h2 className="text-[32px]">個人化推薦主題</h2>
        <h3 className="text-note">
          我們精心為您挑選感興趣的主題，讓您的體驗更豐富。
        </h3>
      </div>
      <section className="mt-8">
        {/* 主題選項 */}
        <div className="flex gap-8">
          <button
            type="button"
            className="flex flex-col items-center gap-4 text-xl"
          >
            <div className="flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
              <Image
                src="/images/topic-dog.png"
                alt="topic-dog"
                priority={true}
                width={158}
                height={158}
              />
            </div>
            狗
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-4 text-xl"
          >
            <div className="flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
              <Image
                src="/images/topic-cat.png"
                alt="topic-cat"
                priority={true}
                width={158}
                height={158}
              />
            </div>
            貓
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-4 text-xl"
          >
            <div className="flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
              <Image
                src="/images/topic-rice.png"
                alt="topic-rice"
                priority={true}
                width={158}
                height={158}
              />
            </div>
            倉鼠
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-4 text-xl"
          >
            <div className="flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
              <Image
                src="/images/topic-other.svg"
                alt="topic-other"
                width={0}
                height={0}
                className="w-auto h-auto"
              />
            </div>
            其他
          </button>
        </div>
        <button
          type="submit"
          className="py-2 mt-12 w-full rounded-full bg-primary text-xl text-white font-semibold"
        >
          確認
        </button>
        <div className="flex justify-end">
          <Link href="/" className="mt-4 text-note underline">
            略過此步驟
          </Link>
        </div>
      </section>
    </section>
  );
};

export default SelectTopic;
