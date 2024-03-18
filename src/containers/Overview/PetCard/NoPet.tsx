import Image from 'next/image';
import Link from 'next/link';

function NoPet() {
  return (
    <div className='flex w-full max-w-[265px] flex-col gap-[24.5px] rounded-[30px] border border-stroke bg-white p-6'>
      <div className='relative h-[217px] w-[217px] overflow-hidden rounded-[30px]'>
        <Image
          src='/images/default-photo.png'
          alt='尚未有寵物照片'
          priority
          fill
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

export default NoPet;
