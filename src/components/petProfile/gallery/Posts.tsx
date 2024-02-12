import React from "react";
import Image from "next/image";
import { IconHeartFilled, IconMessageCircle2Filled } from "@tabler/icons-react";

const Posts: React.FC = () => {
  const allPics = [
    { url: "/test/gallery-1.jpg", hasMilestone: false },
    { url: "/test/gallery-2.jpg", hasMilestone: true },
    { url: "/test/gallery-3.jpg", hasMilestone: false },
    { url: "/test/gallery-4.jpg", hasMilestone: false },
    { url: "/test/gallery-5.jpg", hasMilestone: false },
    { url: "/test/gallery-6.jpg", hasMilestone: true },
  ];
  return (
    <section className="flex gap-4 flex-wrap">
      {allPics.map((value, index) => {
        return (
          <div
            className="gallery-card relative max-w-[352px] w-full max-h-[352px] h-full z-0"
            key={index}
          >
            <Image
              className="rounded-[30px]"
              src={value.url}
              width={352}
              height={352}
              alt="gallery photos"
            />
            {/* milestone badge */}
            {value.hasMilestone ? (
              <Image
                className="absolute bottom-5 left-5"
                src="/test/milestone-1.svg"
                width={74}
                height={70}
                alt="milestone badge"
              />
            ) : null}
            {/* show favorite icon & comments */}
            <ul className="overlay absolute top-0 -z-10 flex gap-x-4 justify-center items-center bg-black/50 w-full h-full text-white rounded-[30px]">
              <li className="flex gap-x-1 items-center">
                <IconHeartFilled size={26} />
                <div>4</div>
              </li>
              <li className="flex gap-x-1 items-center">
                <IconMessageCircle2Filled size={26} />
                <div>1</div>
              </li>
            </ul>
          </div>
        );
      })}
    </section>
  );
};

export default Posts;
