import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useRef, useState } from 'react';

import PetCard from './PetCard';

import type { PetDataType } from '@/common/constants/types';

const SwiperList: React.FC<{ list: PetDataType[] }> = ({ list }) => {
  const swiperRef = useRef<SwiperClass>();
  const [activeIndex, setActiveIndex] = useState(0);

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
        className='absolute z-50'
      >
        {!list.length && <PetCard />}
        {list.map((data: PetDataType) => (
          <SwiperSlide key={Math.random()}>
            <PetCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* pagination */}
      {list.length > 1 && (
        <div className='mx-auto mt-6 flex justify-center gap-4'>
          <button type='button' onClick={() => swiperRef.current?.slidePrev()}>
            <IconChevronLeft />
          </button>
          <div className='flex items-center gap-2'>
            {list.map((data: PetDataType, index) => (
              <span
                key={data.petAccount}
                className={`${
                  activeIndex === index ? 'bg-primary' : 'bg-stroke'
                } inline-block h-[10px] w-[10px] rounded-full duration-100`}
              ></span>
            ))}
          </div>
          <button type='button' onClick={() => swiperRef.current?.slideNext()}>
            <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default SwiperList;
