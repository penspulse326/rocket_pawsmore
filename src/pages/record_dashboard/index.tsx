import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Link from "next/link";

import CalendarLayout from "@/components/recordDashboard/CalendarLayout";
import Upcoming from "@/components/recordDashboard/Upcoming";
import AccountList from "@/components/petInfo/PetAccountList";
import RecordCardLayout from "@/components/recordDashboard/RecordCardLayout";
import Footer from "@/components/Footer";
import Loading from "@/components/hint/Loading";

import { fetchGetRecord } from "@/common/fetch/petProfile";
import sortData from "@/common/helpers/sortData";

import { setRecordInfo } from "@/common/redux/recordSlice";

import type { RootState } from "@/common/redux/store";
import { CardUnionDataType } from "@/types";
import { FetchDataType } from "../pet/[petAccount]";

export interface DateContextProp {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}
export const DateContext = createContext<DateContextProp>({
  selectedDate: moment().format("YYYY-MM-DD"),
  setSelectedDate: () => {},
});

export interface PetIdContextProp {
  petId: number | null;
  setPetId: React.Dispatch<React.SetStateAction<number | null>>;
}
export const PetIdContext = createContext<PetIdContextProp>({
  petId: null,
  setPetId: () => {},
});
const PetIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const petList = useSelector((state: RootState) => state.petList);

  const [petId, setPetId] = useState<number | null>(null);
  const [petAccount, setPetAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (petId && petList) {
      const foundPet = petList.find((pet) => pet.petId === petId);
      if (foundPet) {
        setPetAccount(foundPet.petAccount);
      }
    }
  }, [petId, petList, petAccount]);

  useEffect(() => {
    petAccount && fetchPetRecord();
  }, [petAccount]);

  const fetchPetRecord = async () => {
    setIsLoading(true);
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

      const recordData = {
        petId: petId,
        data: sortedData,
      };

      dispatch(setRecordInfo(recordData));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PetIdContext.Provider value={{ petId, setPetId }}>
      {isLoading && <Loading />}
      {children}
    </PetIdContext.Provider>
  );
};

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

const RecordDashboard: React.FC = () => {
  return (
    <DateProvider>
      <PetIdProvider>
        <section className="inner mt-[96px] flex flex-col gap-y-[64px]">
          <div className="flex gap-x-8">
            <div className="flex flex-col gap-y-8 max-w-[896px] w-full">
              <CalendarLayout />
              <Upcoming />
            </div>
            <div className="flex flex-col gap-y-8 max-w-[480px] w-full">
              <div className="flex justify-between">
                <AccountList />
                <Link
                  href="/record_dashboard/overview"
                  className="flex items-center text-primary font-bold border border-stroke rounded-[30px] px-8 py-4 duration-300 hover:bg-primary hover:text-white"
                >
                  查看數據總覽
                </Link>
              </div>
              <RecordCardLayout />
            </div>
          </div>
          <Footer />
        </section>
      </PetIdProvider>
    </DateProvider>
  );
};

export default RecordDashboard;
