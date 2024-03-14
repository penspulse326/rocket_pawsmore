import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import useToken from '@/common/hooks/useToken';
import { RootState } from '@/common/redux/store';
import { PetDataContext } from '@/containers/PetProfile';
import { PetDataType, UserListDataType } from '@/types';

import Button from './ProfileCard/Button';
import Companionship from './ProfileCard/Companionship';
import Profile from './ProfileCard/Profile';

function ProfileCard() {
  const router = useRouter();
  const { petAccount } = router.query;
  const { token } = useToken();

  const { profile } = useContext(PetDataContext)!;

  const userInfo = useSelector((state: RootState) => state.userInfo);
  const petList = useSelector((state: RootState) => state.petList);

  const [petProfile, setPetProfile] = useState<PetDataType | undefined>();

  const [isMyPet, setIsMyPet] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // 動態路由改變時重新取得寵物檔案資料
  // 追蹤狀態改變時重新渲染畫面
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/pet/profile/${petAccount}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('failed');
        }
        const data = await response.json();
        setPetProfile(data.data);

        const foundSelf = data.data.petsfollowers.find(
          (follower: UserListDataType) => userInfo.account === follower.account
        );
        if (foundSelf) {
          setIsFollowing(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
    };

    if (petAccount) {
      fetchProfile();
    }

    const myPet = petList.find((pet) => pet.petAccount === petAccount);
    if (myPet) {
      setIsMyPet(true);
    }
  }, [petAccount, isFollowing, userInfo, petList]);

  if (!profile || !petProfile) {
    return null;
  }
  const { petsfollowers } = petProfile;

  const handleFollow = debounce(async () => {
    try {
      const response = await fetch(`/api/follow/${petAccount}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('failed');
      }

      if (token !== '') {
        if (isFollowing) {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  }, 500);

  return (
    <section className='mt-12 flex w-full max-w-[696px] flex-col gap-y-8'>
      <Profile petAccount={petAccount} petsfollowers={petsfollowers} />
      <div className='flex items-center gap-x-[56px]'>
        <Companionship />
        <Button
          token={token}
          isMyPet={isMyPet}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
        />
      </div>
    </section>
  );
}

export default ProfileCard;
