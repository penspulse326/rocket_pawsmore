import { IconPhoto, IconMovie, IconMedal } from '@tabler/icons-react';
import { useState } from 'react';

import UploadView from '@/containers/UploadView';

function PawkBtn() {
  const [isUploadViewOpen, setIsUploadViewOpen] = useState(false);

  const handleClick = () => {
    setIsUploadViewOpen(!isUploadViewOpen);
  };

  return (
    <>
      {/* 貼文按鈕 */}
      <button
        type='button'
        onClick={handleClick}
        className='w-full cursor-pointer rounded-[30px] border border-stroke px-8 pb-6 pt-8 outline-none duration-300 hover:bg-stroke'
      >
        {isUploadViewOpen && <UploadView onClose={() => setIsUploadViewOpen(false)} />}
        <div className='rounded-[30px] border border-stroke px-8 py-4 text-left text-note outline-none'>
          在想些什麼呢？
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex gap-8 text-note'>
            <span className='flex items-center gap-2'>
              <IconPhoto className='stroke-black' />
              附上照片
            </span>
            <span className='flex items-center gap-2'>
              <IconMovie className='stroke-black' />
              附上影片
            </span>
            <span className='flex items-center gap-2'>
              <IconMedal className='stroke-black' />
              附上里程碑
            </span>
          </div>
          <span className='rounded-[30px] bg-primary px-8 py-2 font-bold text-white'>Pawk!</span>
        </div>
      </button>
    </>
  );
}

export default PawkBtn;
