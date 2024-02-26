import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  IconHeartRateMonitor,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import RecentCondition from "./RecentCondition";
import Explanation from "./Explanation";
import TableView from "./TableView";
import Footer from "@/components/Footer";

import { RootState } from "@/common/redux/store";
import getPetAge from "@/common/helpers/getPetAge";

import { PetDataType } from "@/types";
import { PetGenderType, SpeciesType } from "@/types/enums";

interface PetCardProps {
  data?: PetDataType;
}

const Overview: React.FC = () => {
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const petList = useSelector((state: RootState) => state.petList);

  const PetCard: React.FC<PetCardProps> = ({ data }) => {
    if (!data) {
      return (
        <div className="flex flex-col gap-[24.5px] p-6 max-w-[265px] w-full border border-stroke rounded-[30px] bg-white">
          <div className="relative w-[217px] h-[217px] rounded-[30px] overflow-hidden">
            <Image
              src="/images/default-photo.png"
              alt="尚未有寵物照片"
              priority={true}
              fill={true}
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="w-auto h-auto"
            />
          </div>
          <span className="text-center">尚未有寵物資料</span>
          <Link
            href="/user_dashboard?to=create_pet"
            className="mb-1.5 py-2 rounded-[30px] bg-primary text-white text-center"
          >
            新增寵物檔案
          </Link>
        </div>
      );
    }
    const {
      petPhoto,
      petName,
      petAccount,
      breed,
      petSpecies,
      petGender,
      birthday,
    } = data;
    return (
      <div className="flex flex-col gap-y-4 p-4 max-w-[224px] w-full border border-stroke rounded-[30px] bg-white">
        <div className="w-[192px] h-[192px]">
          <Image
            src={petPhoto || "/images/default-photo.svg"}
            width={192}
            height={192}
            priority
            alt="pet avatar"
            className="w-full h-full rounded-[30px] object-cover"
          />
        </div>
        <ul className="flex flex-col gap-1">
          <li>{petName}</li>
          <li>@{petAccount}</li>
          <ol className="text-note flex gap-x-2">
            <li>{SpeciesType[petSpecies]}</li>
            <li>{breed}</li>
            <li>{PetGenderType[petGender]}</li>
          </ol>
          <li className="text-note mb-[0px]">{getPetAge(birthday)}</li>
        </ul>
      </div>
    );
  };

  const SwiperList: React.FC<{ list: PetDataType[] }> = ({ list }) => {
    const swiperRef = useRef<SwiperClass>();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div className="relative flex-grow">
        <Swiper
          effect={"cards"}
          modules={[EffectCards]}
          cardsEffect={{
            slideShadows: false,
            perSlideRotate: 3,
            perSlideOffset: 10,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onTransitionEnd={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="absolute z-50"
        >
          {!petList.length && <PetCard />}
          {petList.map((data: PetDataType) => (
            <SwiperSlide key={Math.random()}>
              <PetCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* pagination */}
        {petList.length > 1 && (
          <div className="flex justify-center gap-4 mt-5 mx-auto">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <IconChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {petList.map((data: PetDataType, index) => (
                <span
                  key={data.petAccount}
                  className={`${
                    activeIndex === index ? "bg-primary" : "bg-stroke"
                  } inline-block w-[10px] h-[10px] rounded-full duration-100`}
                ></span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <IconChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="max-w-[1344px]">
      {/* 頁面標題與連結 */}
      <div className="flex justify-between w-full mt-8">
        <h2 className="flex items-center gap-2 text-2xl">
          <IconHeartRateMonitor size={36} />
          數據總覽
        </h2>
        <Link
          href="/record_dashboard"
          className="flex self-center items-center text-primary font-bold border border-stroke rounded-[30px] px-8 py-4 duration-300 hover:bg-primary hover:text-white"
        >
          返回紀錄頁面
        </Link>
      </div>
      {/* 頁面內容 */}
      <div className="flex gap-[43px] mt-4 max-h-[386px]">
        <div className="max-w-[265px]">
          <SwiperList list={petList} />
        </div>
        <RecentCondition />
        <Explanation />
      </div>
      <div className="mt-16">
        <h2 className="flex items-center gap-2 text-2xl">紀錄總覽</h2>
      </div>
      <TableView />
      <div className="mt-[72px]">
        <Footer />
      </div>
    </section>
  );
};

export default Overview;
