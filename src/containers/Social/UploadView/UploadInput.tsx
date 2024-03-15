import { IconMovie, IconPhoto } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';

import { MediaType } from '@/common/constants/types/enums';

const MAX_FILE_SIZE = 1024 * 1024 * 10;

interface PropsType {
  mediaType: MediaType | null;
  onChange: (media: File, type: MediaType) => void;
}

function UploadInput({ mediaType, onChange: handleMediaChange }: PropsType) {
  const [preview, setPreview] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target.files?.[0];
    event.persist();

    //  限制大小
    if (inputFile) {
      if (inputFile.size > MAX_FILE_SIZE) {
        alert('檔案不能超過 10MB');
        return;
      }

      const previewUrl = URL.createObjectURL(inputFile);
      setPreview(previewUrl);

      const fileType = inputFile.type.split('/')[0];
      switch (fileType) {
        case 'image':
          handleMediaChange(inputFile, MediaType.image);
          break;
        case 'video':
          handleMediaChange(inputFile, MediaType.video);
          break;
        default:
          break;
      }
    }
  };

  return (
    <label
      htmlFor='media'
      className='relative flex aspect-square max-h-[476px] max-w-[476px] flex-grow cursor-pointer items-center justify-center gap-8 overflow-hidden rounded-[30px] border border-stroke'
    >
      <input
        id='media'
        name='media'
        type='file'
        accept='.png, .jpg, .jpeg, .mp4, .mov'
        onChange={handleChange}
        className='hidden'
      />
      <div className='flex items-center'>
        <IconPhoto size={24} />
        <span className='ml-2 text-note'>附上照片</span>
      </div>
      <div className='flex items-center'>
        <IconMovie size={24} />
        <span className='ml-2 text-note'>附上影片</span>
      </div>
      {/* 預覽 */}
      <div className='absolute h-full w-full'>
        {mediaType === MediaType.image && (
          <Image src={preview} fill alt='preview' className='h-full w-full object-cover' />
        )}
        {mediaType === MediaType.video && (
          <video src={preview} autoPlay controls loop muted className='absolute h-full w-full' />
        )}
      </div>
    </label>
  );
}

export default UploadInput;
