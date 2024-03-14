import Image from 'next/image';
import React, { useContext, useState } from 'react';

import getPetAge from '@/common/helpers/getPetAge';
import handleFreezeScroll from '@/common/helpers/handleFreezeScroll';
import Mask from '@/components/hint/Mask';
import NetworkList from '@/components/NetworkList';
import { PetDataContext } from '@/containers/PetProfile';
import { PetDataType, UserListDataType } from '@/common/constants/types';
import { PetGenderType, SpeciesType } from '@/common/constants/types/enums';

interface PropsType {
  petAccount: string | string[] | undefined;
  petsfollowers: UserListDataType[];
}

function Profile({ petAccount, petsfollowers }: PropsType) {
  const { profile, postList } = useContext(PetDataContext)!;
  const { birthday, petName, breed, petGender, petIntro, petPhoto, link, petSpecies } =
    profile as PetDataType;

  const [showFollower, setShowFollower] = useState(false);

  const htmlIntro = petIntro?.split('\n');
  const htmlLink = link && link.length > 43 ? `${link.slice(0, 41)}⋯` : link;

  const handleShowFollower = () => {
    setShowFollower(!showFollower);
    handleFreezeScroll(true);
  };

  return (
    <div className='flex gap-x-[56px]'>
      <div className='h-[272px] w-[272px]'>
        <Image
          className='h-full w-full rounded-[30px] object-cover'
          src={petPhoto || '/images/default-photo.svg'}
          priority
          width={272}
          height={272}
          alt='pet avatar'
        />
      </div>
      <div className='flex w-full max-w-[368px] flex-col gap-y-6'>
        <ul className='flex flex-col gap-y-3'>
          <ol>
            <li className='text-[32px]'>{petName}</li>
            <li>@{petAccount}</li>
          </ol>
          <ol className='flex gap-x-2 text-note'>
            <li>{SpeciesType[petSpecies]}</li>
            <li>{breed}</li>
            <li>{PetGenderType[petGender]}</li>
            <li>{getPetAge(birthday)}</li>
          </ol>
        </ul>
        <ul className='flex gap-x-4'>
          <li>
            <span className='pr-1 font-bold'>{postList?.length || 0}</span>貼文
          </li>
          <button onClick={handleShowFollower} type='button'>
            <span className='pr-1 font-bold'>{petsfollowers?.length || 0}</span>
            粉絲
          </button>
        </ul>
        <ol className='flex flex-col gap-y-2'>
          <li>
            {htmlIntro?.map((string, index) => (
              <React.Fragment key={string}>
                {string}
                {index !== htmlIntro.length - 1 && <br />}
              </React.Fragment>
            ))}
          </li>
          {link && (
            <li className='flex gap-x-1'>
              <Image src='/icons/icon-link.svg' width={24} height={24} alt='link icon' />
              <a className='text-link underline' href={link} target='_blank' rel='noreferrer'>
                {htmlLink}
              </a>
            </li>
          )}
          {/* show fans list */}
          {showFollower && (
            <Mask setIsOpen={setShowFollower} maskType='fans'>
              <NetworkList
                type='follower'
                isClosed={showFollower}
                setIsClosed={setShowFollower}
                userList={petsfollowers}
              />
            </Mask>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Profile;
