import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCards } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function PetCards() {
  const testArr = [1, 2, 3];
  const swiperRef = useRef<SwiperClass>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex-grow">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onTransitionEnd={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {testArr.map(() => (
          <SwiperSlide key={Math.random()}>
            <div className="flex flex-col gap-4 mx-auto p-4 max-w-[204px] border border-stroke rounded-[30px] bg-white">
              <Image
                src="/test/photo-cat-test.png"
                width={172}
                height={172}
                priority
                alt="寵物照片"
                className="rounded-[30px] object-cover"
              />
              <div className="flex flex-col gap-1">
                <span>角龍寶寶</span>
                <span>@littleprincess126</span>
              </div>
              <Link
                href="/test/pet_profile"
                className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center hover:bg-primary/70 duration-300"
              >
                寵物檔案
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* pagination */}
      {testArr.length > 1 && (
        <div className="flex justify-center gap-4 mt-6 mx-auto">
          <button type="button" onClick={() => swiperRef.current?.slidePrev()}>
            <IconChevronLeft />
          </button>
          <div className="flex items-center gap-2">
            {testArr.map((item, index) => (
              <span
                key={index}
                className={`${
                  activeIndex === index ? "bg-primary" : "bg-stroke"
                } inline-block w-[10px] h-[10px] rounded-full duration-100`}
              ></span>
            ))}
          </div>
          <button type="button" onClick={() => swiperRef.current?.slideNext()}>
            <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
