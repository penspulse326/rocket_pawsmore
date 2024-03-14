import Image from 'next/image';
import Link from 'next/link';

import type { PetDataType } from '@/common/constants/types';

interface PetCardProps {
  data?: PetDataType;
}

const PetCard: React.FC<PetCardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className='mx-auto flex max-w-[204px] flex-col gap-7 rounded-[30px] border border-stroke bg-white p-4'>
        <div className='relative h-[172px] w-[172px] overflow-hidden rounded-[30px] hover:scale-110'>
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
          className='mb-4 rounded-[30px] bg-primary py-2 text-center text-white'
        >
          新增寵物檔案
        </Link>
      </div>
    );
  }

  const { petAccount, petName, petPhoto } = data;

  return (
    <div className='mx-auto flex max-w-[204px] flex-col gap-4 rounded-[30px] border border-stroke bg-white p-4'>
      <div className='relative h-[172px] w-[172px] overflow-hidden rounded-[30px]'>
        <Image
          src={petPhoto || '/images/default-photo.png'}
          alt={petName}
          priority={true}
          fill={true}
          sizes='100%'
          style={{ objectFit: 'cover' }}
          className='h-auto w-auto duration-150 hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span>{petName}</span>
        <span>@{petAccount}</span>
      </div>
      <Link
        href={`/pet/${petAccount}`}
        className='mb-4 rounded-[30px] bg-primary py-2 text-center text-white duration-300 hover:bg-primary/70'
      >
        寵物檔案
      </Link>
    </div>
  );
};

export default PetCard;
