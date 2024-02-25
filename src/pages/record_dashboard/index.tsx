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

import createAnniversaryEvent from "@/common/helpers/createAnniversary";
import { fetchFormattedRecord } from "@/common/helpers/fetchFormattedRecord";
import { setRecordInfo } from "@/common/redux/recordSlice";
import type { RootState } from "@/common/redux/store";

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
  const [birthday, setBirthday] = useState("");
  const [adoptedDate, setAdoptedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (petId && petList) {
      const foundPet = petList.find((pet) => pet.petId === petId);
      if (foundPet) {
        setPetAccount(foundPet.petAccount);
        setBirthday(foundPet.birthday);
        setAdoptedDate(foundPet.adoptedDate);
      }
    }
  }, [petId, petList, petAccount]);

  useEffect(() => {
    const fetchRecord = async () => {
      setIsLoading(true);

      try {
        if (petAccount && petId) {
          const recordData = await fetchFormattedRecord(petAccount, petId);

          const anniversaryEvent = createAnniversaryEvent(
            birthday,
            adoptedDate,
            petId
          );
          if (recordData) {
            const data = recordData.data.concat(anniversaryEvent);
            const combinedData = { petId: petId, data };

            dispatch(setRecordInfo(combinedData));
          }
        }
      } catch (error) {
        console.error("Error fetching pet record:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, [petAccount]);

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
