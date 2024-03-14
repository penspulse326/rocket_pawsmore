import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useToken from '@/common/hooks/useToken';
import { RootState } from '@/common/redux/store';

import PetList from '@/containers/UserProfile/PetList';
import Profile from '@/containers/UserProfile/Profile';

import { PetDataType, RequestedUserInfoType } from '@/common/constants/types';

interface PropsType {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserProfile({ setIsLoading }: PropsType) {
  const router = useRouter();
  const { token } = useToken();
  const { userAccount } = router.query;
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<RequestedUserInfoType | undefined>();
  const [petList, setPetList] = useState<PetDataType[] | undefined>();
  const [isMe, setIsMe] = useState(true);

  // 動態路由改變時重新取得使用者帳號及寵物清單資料
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/user/${userAccount}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('failed');
        }
        const data = await response.json();
        if (data) {
          setUserData(data.data);
          setUserId(data.data.userId);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    const fetchPetList = async () => {
      try {
        const response = await fetch(`/api/pet/list/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('failed');
        }
        const data = await response.json();
        setPetList(data.data);
      } finally {
        setIsLoading(false);
      }
    };

    if (userAccount) {
      fetchUserProfile();
    }
    if (userId !== '') {
      fetchPetList();
    }

    if (userAccount && userInfo.account) {
      const notMe = userInfo.account !== userAccount;

      if (notMe) {
        setIsMe(false);
      }
    }
  }, [userInfo, userAccount, userId]);

  return (
    <>
      <Profile userData={userData} isMe={isMe} userAccount={userAccount} />
      <PetList petList={petList} isMe={isMe} />
    </>
  );
}

export default UserProfile;
