import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { IconHeartRateMonitor, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import RecentCondition from './RecentCondition';
import Explanation from './Explanation';
import TableView from './TableView';
import Footer from '@/components/Footer';
import Loading from '@/components/hint/Loading';

import { RootState } from '@/common/redux/store';
import getPetAge from '@/common/helpers/getPetAge';
import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';

import { setRecordInfo } from '@/common/redux/recordSlice';
import { PetDataType } from '@/common/constants/types';
import { PetGenderType, SpeciesType } from '@/common/constants/types/enums';

interface PetCardProps {
  data?: PetDataType;
}

const Overview: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const petList = useSelector((state: RootState) => state.petList);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const foundPetIndex = useRef<number>();

  const PetCard: React.FC<PetCardProps> = ({ data }) => {
    if (!data) {
      return (
        <div className='flex w-full max-w-[265px] flex-col gap-[24.5px] rounded-[30px] border border-stroke bg-white p-6'>
          <div className='relative h-[217px] w-[217px] overflow-hidden rounded-[30px]'>
            <Image
              src='/images/default-photo.png'
              alt='尚未有寵物照片'
              priority={true}
              fill={true}
              sizes='100%'
              style={{ objectFit: 'cover' }}
              className='h-auto w-auto'
            />
          </div>
          <span className='text-center'>尚未有寵物資料</span>
          <Link
            href='/user_dashboard?to=create_pet'
            className='mb-1.5 rounded-[30px] bg-primary py-2 text-center text-white'
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
      petId,
      adoptedDate,
    } = data;

    const handleSwitchPet = async () => {
      setIsLoading(true);
      const recordData = await fetchFormattedRecord(petAccount, petId, birthday, adoptedDate);
      dispatch(setRecordInfo(recordData));

      const index = petList.findIndex((pet) => pet.petId === petId);

      setSelectedIndex(index);
      setIsLoading(false);
    };

    return (
      <div
        className='flex w-full max-w-[224px] flex-col gap-y-4 rounded-[30px] border border-stroke bg-white p-4 hover:cursor-pointer'
        onClick={handleSwitchPet}
      >
        <div className='h-[192px] w-[192px]'>
          <Image
            src={petPhoto || '/images/default-photo.svg'}
            width={192}
            height={192}
            priority
            alt='pet avatar'
            className='h-full w-full rounded-[30px] object-cover'
          />
        </div>
        <ul className='flex flex-col gap-1'>
          <li>{petName}</li>
          <li>@{petAccount}</li>
          <ol className='flex gap-x-2 text-note'>
            <li>{SpeciesType[petSpecies]}</li>
            <li>{breed}</li>
            <li>{PetGenderType[petGender]}</li>
          </ol>
          <li className='mb-[0px] text-note'>{getPetAge(birthday)}</li>
        </ul>
      </div>
    );
  };

  const SwiperList: React.FC = () => {
    const swiperRef = useRef<SwiperClass>();
    const [activeIndex, setActiveIndex] = useState(0);

    foundPetIndex.current = selectedIndex;

    return (
      <div className='relative flex-grow'>
        <Swiper
          effect={'cards'}
          modules={[EffectCards]}
          cardsEffect={{
            slideShadows: false,
            perSlideRotate: 3,
            perSlideOffset: 10,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onTransitionEnd={(swiper) => setActiveIndex(swiper.activeIndex)}
          initialSlide={foundPetIndex.current}
          className='absolute z-50'
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
          <div className='mx-auto mt-5 flex justify-center gap-4'>
            <button
              type='button'
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
            >
              <IconChevronLeft size={16} />
            </button>
            <div className='flex items-center gap-2'>
              {petList.map((data: PetDataType, index) => (
                <span
                  key={data.petAccount}
                  className={`${
                    activeIndex === index ? 'bg-primary' : 'bg-stroke'
                  } inline-block h-[10px] w-[10px] rounded-full duration-100`}
                ></span>
              ))}
            </div>
            <button type='button' onClick={() => swiperRef.current?.slideNext()}>
              <IconChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className='max-w-[1344px]'>
      {isLoading && <Loading />}
      {/* 頁面標題與連結 */}
      <div className='mt-8 flex w-full justify-between'>
        <h2 className='flex items-center gap-2 text-2xl'>
          <IconHeartRateMonitor size={36} />
          數據總覽
        </h2>
        <Link
          href='/record_dashboard'
          className='flex items-center self-center rounded-[30px] border border-stroke px-8 py-4 font-bold text-primary duration-300 hover:bg-primary hover:text-white'
        >
          返回紀錄頁面
        </Link>
      </div>
      {/* 頁面內容 */}
      <div className='mt-4 flex max-h-[386px] gap-[43px]'>
        <div className='max-w-[265px]'>
          <SwiperList />
        </div>
        <RecentCondition />
        <Explanation />
      </div>
      <div className='mt-16'>
        <h2 className='flex items-center gap-2 text-2xl'>紀錄總覽</h2>
      </div>
      <TableView />
      <div className='mt-[72px]'>
        <Footer />
      </div>
    </section>
  );
};

export default Overview;
