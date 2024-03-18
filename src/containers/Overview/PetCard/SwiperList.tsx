import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { PetDataType } from '@/common/constants/types';
import { RootState } from '@/common/redux/store';

import PetCard from '.';
import 'swiper/css';
import 'swiper/css/effect-cards';

interface PropsType {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SwiperList({ setIsLoading }: PropsType) {
  const petList = useSelector((state: RootState) => state.petList);

  const swiperRef = useRef<SwiperClass>();
  const foundPetIndex = useRef<number>();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  foundPetIndex.current = selectedIndex;

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper;
  };

  return (
    <div className='relative flex-grow'>
      <Swiper
        effect='cards'
        modules={[EffectCards]}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: 3,
          perSlideOffset: 10,
        }}
        onSwiper={handleSwiper}
        onTransitionEnd={(swiper) => setActiveIndex(swiper.activeIndex)}
        initialSlide={foundPetIndex.current}
        className='absolute z-50'
      >
        {petList.map((data: PetDataType) => (
          <SwiperSlide key={Math.random()}>
            <PetCard data={data} setSelectedIndex={setSelectedIndex} setIsLoading={setIsLoading} />
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
              />
            ))}
          </div>
          <button type='button' onClick={() => swiperRef.current?.slideNext()}>
            <IconChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SwiperList;
