import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/common/redux/store';

import type { PetDataType } from '@/common/constants/types';
import Link from 'next/link';

interface PropsType {
  petId?: number;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AccountList: React.FC<PropsType> = ({ setId, petId }) => {
  const petList = useSelector((state: RootState) => state.petList);
  const initailPet = petList.filter((pet) => pet.petId === petId)?.[0];

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDataType>(initailPet || petList[0]);

  useEffect(() => {
    if (selectedPet) {
      setId(selectedPet.petId);
    }
  }, [selectedPet]);

  const AccountCard = () => {
    return (
      <div className='flex w-full items-center gap-x-2 rounded-[60px] border border-stroke p-2 hover:cursor-pointer'>
        <div className='relative h-full max-h-12 w-full max-w-12 overflow-hidden rounded-full'>
          <Image
            src={selectedPet.petPhoto || '/images/default-photo.png'}
            alt={selectedPet.petAccount}
            priority={false}
            fill={true}
            sizes='100%'
            style={{ objectFit: 'cover' }}
            className='h-auto w-auto'
          />
        </div>
        <div className='flex grow items-center justify-between'>
          <ul>
            <li>{selectedPet.petName}</li>
            <li className='text-note'>@{selectedPet.petAccount}</li>
          </ul>
          {!petId && <IconChevronDown size={24} className={`${isExpanded && 'rotate-180'} mr-2`} />}
        </div>
      </div>
    );
  };
  const ExpandedCard = () => {
    return (
      <div className='shadow-custom absolute top-[76px] z-10 w-full rounded-[30px] bg-white p-2'>
        {petList.map(({ petAccount, petName, petPhoto, petId }, index) => {
          return (
            <ul
              className='flex items-center gap-x-2 rounded-[60px] p-2 hover:cursor-pointer hover:bg-secondary'
              onClick={() => {
                setSelectedPet(petList[index]);
                setIsExpanded(false);
                setId(petId);
              }}
              key={`${index}-${petAccount}`}
            >
              <div className='relative h-12 max-h-12 w-full max-w-12 overflow-hidden rounded-full'>
                <Image
                  src={petPhoto || '/images/default-photo.png'}
                  alt={petAccount}
                  priority={false}
                  fill={true}
                  sizes='100%'
                  style={{ objectFit: 'cover' }}
                  className='h-auto w-auto'
                />
              </div>
              <ol className='mr-2 truncate'>
                <li>{petName}</li>
                <li className='text-note'>@{petAccount}</li>
              </ol>
            </ul>
          );
        })}
      </div>
    );
  };
  return (
    <section
      className='relative flex h-16 w-full max-w-[250px] flex-col items-center justify-center'
      onClick={() => setIsExpanded(!isExpanded)}
      onBlur={() => setIsExpanded(false)}
      tabIndex={1}
    >
      {selectedPet ? (
        <AccountCard />
      ) : (
        <Link href='#' className='font-bold text-primary'>
          您尚未建立寵物檔案
        </Link>
      )}
      {!petId && isExpanded && <ExpandedCard />}
    </section>
  );
};

export default AccountList;
