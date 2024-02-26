import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const data = [
  { name: "狗", src: "/images/topic-dog.png" },
  { name: "貓", src: "/images/topic-cat.png" },
  { name: "倉鼠", src: "/images/topic-rice.png" },
];

const SelectTopic = () => {
  const [selected, setSelected] = useState<string>("");

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
          {data.map(({ name, src }, index) => (
            <button
              key={`${index}-${name}`}
              type="button"
              onClick={() => setSelected(name)}
              className="flex flex-col items-center gap-4 text-xl"
            >
              <div className="relative flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
                <Image
                  src={src}
                  alt={name}
                  priority={false}
                  width={158}
                  height={158}
                />
                {selected === name && (
                  <div className="absolute flex justify-center items-center w-full h-full bg-[#333333aa]">
                    <Image
                      src="/icons/icon-paw-white.svg"
                      alt="paw"
                      priority={false}
                      width={80}
                      height={80}
                      className="w-auto h-auto"
                    />
                  </div>
                )}
              </div>
              {name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected("其他")}
            className="flex flex-col items-center gap-4 text-xl"
          >
            <div className="relative flex justify-center items-center w-[158px] h-[158px] border border-stroke rounded-3xl overflow-hidden">
              <Image
                src="/images/topic-other.svg"
                alt="topic-other"
                width={0}
                height={0}
                className="w-auto h-auto"
              />
              {selected === "其他" && (
                <div className="absolute flex justify-center items-center w-full h-full bg-[#333333aa]">
                  <Image
                    src="/icons/icon-paw-white.svg"
                    alt="paw"
                    priority={false}
                    width={80}
                    height={80}
                    className="w-auto h-auto"
                  />
                </div>
              )}
            </div>
            其他
          </button>
        </div>
        <button
          type="button"
          disabled={!selected}
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
