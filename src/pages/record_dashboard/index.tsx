import moment from 'moment';
import Link from 'next/link';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';
import { setRecordInfo } from '@/common/redux/recordSlice';
import Footer from '@/components/Footer';
import Loading from '@/components/hint/Loading';
import AccountList from '@/components/petInfo/PetSelect';
import CalendarLayout from '@/components/recordDashboard/CalendarLayout';
import RecordCardLayout from '@/components/recordDashboard/RecordCardLayout';
import Upcoming from '@/components/recordDashboard/Upcoming';

import type { RootState } from '@/common/redux/store';

export interface DateContextProp {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}
export const DateContext = createContext<DateContextProp>({
  selectedDate: moment().format('YYYY-MM-DD'),
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
  const [petAccount, setPetAccount] = useState('');
  const [birthday, setBirthday] = useState('');
  const [adoptedDate, setAdoptedDate] = useState('');
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
          const recordData = await fetchFormattedRecord(petAccount, petId, birthday, adoptedDate);

          dispatch(setRecordInfo(recordData));
        }
      } catch (error) {
        console.error('Error fetching pet record:', error);
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
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

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
        <section className='inner mt-[96px] flex flex-col gap-y-[64px]'>
          <div className='flex gap-x-8'>
            <div className='flex w-full max-w-[896px] flex-col gap-y-8'>
              <CalendarLayout />
              <Upcoming />
            </div>
            <div className='flex w-full max-w-[480px] flex-col gap-y-8'>
              <div className='flex justify-between'>
                {/* <AccountList /> */}
                <Link
                  href='/record_dashboard/overview'
                  className='flex items-center rounded-[30px] border border-stroke px-8 py-4 font-bold text-primary duration-300 hover:bg-primary hover:text-white'
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
