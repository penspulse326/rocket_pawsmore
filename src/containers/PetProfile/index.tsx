import React, { createContext, useState, useEffect, useMemo } from 'react';

import {
  fetchGetPet,
  fetchGetPost,
  fetchGetRecord,
  fetchGetMilestone,
} from '@/common/fetch/petProfile';
import sortData from '@/common/helpers/sortData';
import ProfileCard from '@/containers/PetProfile/ProfileCard';
import ProfileGallery from '@/containers/PetProfile/ProfileGallery';
import {
  PetDataType,
  PostDataType,
  CardUnionDataType,
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from '@/common/constants/types';

export const PetDataContext = createContext<
  | {
      postList: PostDataType[] | undefined;
      profile: PetDataType | undefined;
      record: CardUnionDataType[] | undefined;
      milestone:
        | {
            petId: number;
            milestoneTypes: string;
          }
        | undefined;
    }
  | undefined
>(undefined);

export interface FetchDataType {
  petId: number;
  dailyCards: DailyCardDataType[];
  medicalCards: MedicalCardDataType[];
  momentCards: MomentCardDataType[];
}

interface PropsType {
  petAccount: string | string[] | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function PetProfile({ petAccount, setIsLoading }: PropsType) {
  const [profile, setProfile] = useState<PetDataType>();
  const [postList, setPostList] = useState<PostDataType[]>();
  const [record, setRecord] = useState<CardUnionDataType[]>();
  const [milestone, setMilestone] = useState();

  const fetchProfile = async () => {
    try {
      const response = await fetchGetPet(petAccount as string);
      if (!response.ok) {
        throw new Error('failed');
      }
      setProfile(response.data);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetchGetPost(petAccount as string);
      if (!response.ok) {
        throw new Error('failed');
      }
      setPostList(response.data);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  const fetchRecord = async () => {
    try {
      const response = await fetchGetRecord(petAccount as string);
      if (!response.ok) {
        throw new Error('failed');
      }

      const { dailyCards, medicalCards, momentCards }: FetchDataType = response.data;
      const data: CardUnionDataType[] = [...dailyCards, ...medicalCards, ...momentCards];

      const sortedData = sortData(data);
      setRecord(sortedData);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  const fetchMilestone = async () => {
    try {
      const response = await fetchGetMilestone(petAccount as string);
      setMilestone(response.data);

      if (!response.ok) {
        throw new Error('failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  // 動態路由改變時重新取得所有寵物檔案資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (petAccount) {
          setIsLoading(true);

          await fetchProfile();
          await fetchPost();
          await fetchRecord();
          await fetchMilestone();

          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [petAccount]);

  const petDataContextValue = useMemo(
    () => ({ profile, postList, record, milestone }),
    [profile, postList, record, milestone]
  );

  return (
    <PetDataContext.Provider value={petDataContextValue}>
      <ProfileCard />
      <ProfileGallery />
    </PetDataContext.Provider>
  );
}

export default PetProfile;
