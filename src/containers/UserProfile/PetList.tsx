import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo } from 'react';

import getPetAge from '@/common/helpers/getPetAge';

import AddPet from '@/components/AddPet';
import NoContent from '@/components/NoContent';

import { PetDataType } from '@/types';
import { SpeciesType, PetGenderType } from '@/types/enums';

interface PropsType {
  petList: PetDataType[] | undefined;
  isMe: boolean;
}

function PetList({ petList, isMe }: PropsType) {
  const router = useRouter();

  const PetCards = memo(function PetCardsComponent() {
    return (
      <div className='flex flex-wrap gap-4'>
        {petList &&
          petList.map((pet) => {
            const { petName, petAccount, petSpecies, petGender, breed, birthday, petPhoto } = pet;

            const handleCheckPet = (prop: string) => {
              router.push(`/pet/${prop}`);
            };

            return (
              <button
                className='flex w-full max-w-[224px] flex-col gap-y-4 rounded-[30px] border border-stroke bg-white p-4 text-left hover:cursor-pointer'
                key={petAccount}
                onClick={() => handleCheckPet(petAccount)}
                type='button'
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
                  <li className='mb-4 text-note'>{getPetAge(birthday)}</li>
                </ul>
              </button>
            );
          })}
        <div className='max-h-[366px]'>{isMe && <AddPet type='already' />}</div>
      </div>
    );
  });

  const renderList = () => {
    if (isMe) {
      if (petList) {
        return <PetCards />;
      }
      return <AddPet type='yet' />;
    }
    if (petList) {
      return <PetCards />;
    }
    return <NoContent />;
  };

  return (
    <div className='flex w-full max-w-[704px] flex-col gap-y-4'>
      <div className='text-note'>寵物檔案清單</div>
      {renderList()}
    </div>
  );
}

export default PetList;
