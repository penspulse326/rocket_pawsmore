import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fetchGetSpeciesPosts } from '@/common/fetch/post';
import getPetAge from '@/common/helpers/getPetAge';
import Mask from '@/components/hint/Mask';
import PostView from '@/components/Post/PostView';
import { PetGenderType, MediaType, SpeciesType } from '@/types/enums';

import type { PostDataType, SearchPetData } from '@/types';

interface PropsType {
  data: SearchPetData[];
}

const SearchResult: React.FC<PropsType> = ({ data }) => {
  const [searchData, setSearchData] = useState<SearchPetData[]>(data || []);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  return (
    <section className='flex w-full max-w-[658px] flex-col border-x border-stroke bg-white px-8 py-24'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[32px]'>搜尋結果：</h1>
        <button type='button' className='text-note underline' onClick={() => setSearchData([])}>
          清空搜尋條件
        </button>
      </div>
      {searchData.length ? (
        <ul className='mt-16 grid grid-cols-3 gap-2'>
          {searchData?.map((account: SearchPetData) => {
            const { Id, PetAccount, PetName, PetPhoto, PetSpecies, PetGender, Breed, Birthday } =
              account;
            return (
              <li key={`${Id}-${PetAccount}`}>
                <Link
                  href={`/pet/${PetAccount}`}
                  className='relative flex h-full w-full flex-col gap-4 rounded-[30px] border border-stroke p-4 '
                >
                  <div className='relative flex aspect-square h-full max-h-40 w-full max-w-40 overflow-hidden rounded-[30px]'>
                    <Image
                      src={PetPhoto || '/images/default-photo.png'}
                      alt={PetName}
                      priority
                      fill
                      sizes='100%'
                      className='h-auto w-auto object-cover duration-100 hover:scale-110'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <span>{PetName}</span>
                    <span>@{PetAccount}</span>
                    <div className='flex gap-2 text-note'>
                      <span>{SpeciesType[PetSpecies]}</span>
                      <span>{Breed}</span>
                      <span>{PetGenderType[PetGender]}</span>
                    </div>
                    <span>{getPetAge(Birthday)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='mt-24 flex flex-col items-center justify-center'>
          <Image src='/icons/icon-paw-gradient.svg' width={162} height={162} alt='no content' />
          <span className='text-2xl'>沒有任何搜尋結果</span>
          <span className='text-note'>請檢查拼字是否有誤</span>
        </div>
      )}
    </section>
  );
};

export default SearchResult;
