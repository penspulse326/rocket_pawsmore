import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Image from 'next/image';
import moment from 'moment';
import { IconPhoto, IconCalendarPlus, IconChevronRight } from '@tabler/icons-react';

import { RootState } from '@/common/redux/store';
import getPetSpecies from '@/common/helpers/getPetSpecies';

import ErrorMessage from '../ErrorMessage';
import { errorText } from '@/common/constants/messageText';
import useToken from '@/common/hooks/useToken';

const PetProfile = () => {
  const { token } = useToken();
  const petList = useSelector((state: RootState) => state.petList);

  const router = useRouter();
  const { petId } = router.query;

  const selectedPet = petList.find((pet) => pet.petId === Number(petId));

  const [breed, setBreed] = useState(selectedPet && selectedPet.breed);
  const [name, setName] = useState(selectedPet && selectedPet.petName);
  const [account, setAccount] = useState(selectedPet && selectedPet.petAccount);
  const [info, setInfo] = useState(selectedPet && selectedPet.petIntro);
  const [link, setLink] = useState(selectedPet && selectedPet.link);
  const [birthday, setBirthday] = useState(
    selectedPet && moment(selectedPet.birthday).format('YYYY-MM-DD')
  );
  const [adoptedDate, setAdoptedDate] = useState(
    selectedPet && moment(selectedPet.adoptedDate).format('YYYY-MM-DD')
  );

  if (!selectedPet) {
    return null;
  }

  const { petPhoto, petSpecies, petGender } = selectedPet;

  const rowsOfTextarea: number = info ? info.split('\n').length : 1;

  const formData = {
    petId: petId,
    petAccount: account,
    petName: name,
    petSpecies: petSpecies,
    petGender: petGender,
    breed: breed,
    birthday: birthday,
    adoptedDate: adoptedDate,
    petPhoto: petPhoto,
    petIntro: info,
    link: link,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/pet/update/${petId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {}
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='ml-[144px] mt-8 flex max-w-[1192px] flex-col gap-y-8'>
      <ul className='flex items-center gap-x-4 text-xl'>
        <li className='hover:cursor-pointer' onClick={handleGoBack}>
          寵物檔案清單
        </li>
        <IconChevronRight />
        <li>{name}</li>
      </ul>
      <form
        className='flex w-full max-w-[728px] flex-col gap-y-12 rounded-[30px] border border-stroke p-8'
        onSubmit={handleSubmit}
      >
        {/* profile */}
        <div className='flex flex-col gap-y-4'>
          <div className='text-xl'>寵物基本資料</div>
          <div className='flex gap-x-12'>
            {/* photo */}
            <div className='flex w-full max-w-[264px] flex-col gap-y-4'>
              <div>寵物照片</div>
              <div className='mx-auto h-[168px] w-[168px]'>
                <Image
                  src={petPhoto || '/images/default-photo.svg'}
                  width={168}
                  height={168}
                  alt='user avatar'
                  className='h-full w-full rounded-full border border-stroke object-cover'
                />
              </div>
              <button className='mx-auto flex gap-x-2' type='button'>
                <IconPhoto size={24} color={'#203170'} />
                <span className='text-primary'>上傳照片</span>
              </button>
            </div>
            {/* bio */}
            <div className='flex w-full max-w-[352px] flex-col gap-y-4'>
              <ul className='flex flex-col gap-y-1'>
                <li>物種</li>
                <li className='self-start rounded-full bg-primary px-4 py-2 text-white'>
                  {getPetSpecies(petSpecies)}
                </li>
              </ul>
              <ul className='flex flex-col gap-y-1'>
                <li>性別</li>
                <li className='self-start rounded-full bg-primary px-4 py-2 text-white'>
                  {petGender ? '女生' : '男生'}
                </li>
              </ul>
              <ul className='flex flex-col gap-y-1'>
                <ol className='flex justify-between'>
                  <li>
                    品種<span className='font-semibold text-error'>*</span>
                  </li>
                  <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
                </ol>
                <input
                  type='text'
                  value={breed}
                  className='rounded-[10px] border border-stroke px-4 py-3'
                  onChange={(e) => setBreed(e.target.value)}
                />
              </ul>
              <ul className='flex flex-col gap-y-1'>
                <ol className='flex justify-between'>
                  <label htmlFor='birthday'>
                    生日<span className='font-semibold text-error'>*</span>
                  </label>
                  <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
                </ol>
                <ol className='relative flex gap-x-2'>
                  <IconCalendarPlus size={24} className='absolute' />
                  <input
                    type='date'
                    value={birthday}
                    id='birthday'
                    className='w-full pl-8'
                    onChange={(e) => setBirthday(moment(e.target.value).format('YYYY-MM-DD'))}
                  />
                </ol>
              </ul>
              <ul className='flex flex-col gap-y-1'>
                <label htmlFor='adoptedDate'>領養日</label>
                <ol className='relative flex gap-x-2'>
                  <IconCalendarPlus size={24} className='absolute' />
                  <input
                    type='date'
                    value={adoptedDate || ''}
                    id='adoptedDate'
                    className='w-full pl-8'
                    onChange={(e) => setAdoptedDate(moment(e.target.value).format('YYYY-MM-DD'))}
                  />
                </ol>
              </ul>
            </div>
          </div>
        </div>
        {/* account */}
        <div className='flex w-full flex-col gap-y-4'>
          <div className='text-xl'>寵物帳號資料</div>
          <div className='flex justify-between gap-x-8'>
            {/* pet account */}
            <ul className='flex w-full max-w-[316px] flex-col gap-y-1'>
              <ol className='flex justify-between'>
                <li>
                  寵物帳號<span className='font-semibold text-error'>*</span>
                </li>
                <ErrorMessage>{errorText.ACCOUNT_EXIST}</ErrorMessage>
              </ol>
              <input
                type='text'
                value={account}
                className='rounded-[10px] border border-stroke px-4 py-3'
                onChange={(e) => setAccount(e.target.value)}
              />
            </ul>
            {/* pet name */}
            <ul className='flex w-full max-w-[316px] flex-col gap-y-1'>
              <ol className='flex justify-between'>
                <li>
                  寵物名稱<span className='font-semibold text-error'>*</span>
                </li>
                <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
              </ol>
              <input
                type='text'
                value={name}
                className='rounded-[10px] border border-stroke px-4 py-3'
                onChange={(e) => setName(e.target.value)}
              />
            </ul>
          </div>
          <div className='flex justify-between gap-x-8'>
            {/* info */}
            <div className='flex w-full max-w-[316px] flex-col gap-y-1'>
              <label htmlFor='info'>寵物簡介</label>
              <textarea
                name='info'
                id='info'
                value={info}
                maxLength={150}
                rows={rowsOfTextarea}
                className='h-auto resize-none rounded-[10px] border border-stroke px-4 py-3'
                onChange={(e) => setInfo(e.target.value)}
              ></textarea>
            </div>
            {/* link */}
            <div className='flex w-full max-w-[316px] flex-col gap-y-1'>
              <label htmlFor='link'>連結</label>
              <input
                type='text'
                id='link'
                value={link}
                className='rounded-[10px] border border-stroke px-4 py-3'
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className='self-center rounded-[300px] bg-primary px-[104px] py-2 text-white'
          type='submit'
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default PetProfile;
