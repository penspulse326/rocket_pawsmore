import { IconChevronUp } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { PetDataType } from '@/common/constants/types';
import type { RootState } from '@/common/redux/store';

interface PropsType {
  onSelect: (petId: number) => void;
}

function PetSelect({ onSelect: handleSelect }: PropsType) {
  const petList = useSelector((state: RootState) => state.petList);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDataType>(petList[0] || []);

  const handleChange = (index: number) => {
    setSelectedPet(petList[index]);
    handleSelect(petList[index].petId);
    setIsExpanded(false);
  };

  // 有寵物的話就把第一個寵物設為預設
  useEffect(() => {
    if (petList?.length > 0) {
      setSelectedPet(petList[0]);
      handleSelect(petList[0].petId);
    }
  }, [petList]);

  return (
    <button
      type='button'
      className='relative flex h-16 w-full max-w-[250px] flex-col items-center justify-center'
      onClick={() => setIsExpanded(!isExpanded)}
      onBlur={() => setIsExpanded(false)}
    >
      {selectedPet ? (
        <div className='flex w-full items-center gap-x-2 rounded-[60px] border border-stroke p-2 hover:cursor-pointer'>
          <div className='relative h-full max-h-12 w-full max-w-12 overflow-hidden rounded-full'>
            <Image
              src={selectedPet.petPhoto || '/images/default-photo.png'}
              alt={selectedPet.petAccount}
              priority
              fill
              sizes='100%'
              className='object-cover'
            />
          </div>
          <div className='flex grow items-center justify-between'>
            <ul className='text-left'>
              <li>{selectedPet.petName}</li>
              <li className='text-note'>@{selectedPet.petAccount}</li>
            </ul>
            <IconChevronUp
              size={24}
              className={`${!isExpanded && 'rotate-180'} mr-2 duration-300`}
            />
          </div>
        </div>
      ) : (
        <span className='font-bold text-primary'>您尚未建立寵物檔案</span>
      )}
      {/* 下拉選單 */}
      {petList.length !== 0 && isExpanded && (
        <div className='shadow-custom absolute top-[76px] z-10 w-full rounded-[30px] bg-white p-2'>
          {petList.map(({ petAccount, petName, petPhoto }, index) => {
            return (
              <button
                type='button'
                className='flex w-full items-center gap-x-2 rounded-[60px] p-2 hover:cursor-pointer hover:bg-secondary'
                onClick={() => handleChange(index)}
                key={petAccount}
              >
                <div className='relative h-12 max-h-12 w-full max-w-12 overflow-hidden rounded-full'>
                  <Image
                    src={petPhoto || '/images/default-photo.png'}
                    alt={petAccount}
                    priority
                    fill
                    sizes='100%'
                    className='object-cover'
                  />
                </div>
                <ul className='mr-2 truncate text-left'>
                  <li>{petName}</li>
                  <li className='text-note'>@{petAccount}</li>
                </ul>
              </button>
            );
          })}
        </div>
      )}
    </button>
  );
}

export default PetSelect;
