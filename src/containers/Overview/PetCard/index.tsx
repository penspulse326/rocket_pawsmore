import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { PetDataType } from '@/common/constants/types';
import { PetGenderType, SpeciesType } from '@/common/constants/types/enums';
import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';
import getPetAge from '@/common/helpers/getPetAge';
import { setRecordInfo } from '@/common/redux/recordSlice';
import { RootState } from '@/common/redux/store';

import NoPet from './NoPet';

// 渲染卡片用的寵物檔案
// useState hook: 目前選擇的寵物的 index、loading 狀態
interface PropsType {
  data: PetDataType;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function PetCard({ data, setSelectedIndex, setIsLoading }: PropsType) {
  const dispatch = useDispatch();
  const petList = useSelector((state: RootState) => state.petList);

  if (!data) {
    <NoPet />;
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

  // 切換並取得寵物的所有紀錄
  // 更新狀態為目前選擇寵物在 petList 中的 index
  const handleSwitchPet = async () => {
    setIsLoading(true);
    const recordData = await fetchFormattedRecord(petAccount, petId, birthday, adoptedDate);
    dispatch(setRecordInfo(recordData));

    const index = petList.findIndex((pet) => pet.petId === petId);

    setSelectedIndex(index);
    setIsLoading(false);
  };

  return (
    <button
      className='flex w-full max-w-[224px] flex-col gap-y-4 rounded-[30px] border border-stroke bg-white p-4 text-left'
      onClick={handleSwitchPet}
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
        <li className='mb-[0px] text-note'>{getPetAge(birthday)}</li>
      </ul>
    </button>
  );
}

export default PetCard;
