import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProfileCard from "@/components/petProfile/ProfileCard";
import ProfileGallery from "@/components/petProfile/ProfileGallery";
import Footer from "@/components/Footer";
import Loading from "@/components/hint/Loading";

import sortData from "@/common/helpers/sortData";
import {
  fetchGetPet,
  fetchGetPost,
  fetchGetRecord,
  fetchGetMilestone,
} from "@/common/fetch/petProfile";

import {
  PetDataType,
  PostDataType,
  CardUnionDataType,
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from "@/types";

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

const PetProfile: React.FC = () => {
  const router = useRouter();
  const { petAccount } = router.query;

  const [profile, setProfile] = useState<PetDataType>();
  const [postList, setPostList] = useState<PostDataType[]>();
  const [record, setRecord] = useState<CardUnionDataType[]>();
  const [milestone, setMilestone] = useState();

  const [isLoading, setIsLoading] = useState(false);

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
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [petAccount]);

  const fetchProfile = async () => {
    try {
      const response = await fetchGetPet(petAccount as string);
      if (!response.ok) {
        throw new Error("failed");
      }
      setProfile(response.data);
    } catch (error) {}
  };

  const fetchPost = async () => {
    try {
      const response = await fetchGetPost(petAccount as string);
      if (!response.ok) {
        throw new Error("failed");
      }
      setPostList(response.data);
    } catch (error) {}
  };

  const fetchRecord = async () => {
    try {
      const response = await fetchGetRecord(petAccount as string);
      if (!response.ok) {
        throw new Error("failed");
      }

      const { dailyCards, medicalCards, momentCards }: FetchDataType =
        response.data;
      const data: CardUnionDataType[] = [
        ...dailyCards,
        ...medicalCards,
        ...momentCards,
      ];

      const sortedData = sortData(data);
      setRecord(sortedData);
    } catch (error) {}
  };

  const fetchMilestone = async () => {
    try {
      const response = await fetchGetMilestone(petAccount as string);
      setMilestone(response.data);

      if (!response.ok) {
        throw new Error("failed");
      }
    } catch (error) {}
  };

  return (
    <PetDataContext.Provider value={{ profile, postList, record, milestone }}>
      {isLoading && <Loading />}
      <main className="flex flex-col gap-y-12 items-center mt-[64px]">
        <ProfileCard />
        <ProfileGallery />
        <Footer />
      </main>
    </PetDataContext.Provider>
  );
};

export default PetProfile;
