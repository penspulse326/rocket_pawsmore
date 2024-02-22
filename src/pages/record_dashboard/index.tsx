import React, { createContext, useState, ReactNode } from "react";
import moment from "moment";

import CalendarLayout from "@/components/recordDashboard/CalendarLayout";
import Upcoming from "@/components/recordDashboard/Upcoming";
import AccountList from "@/components/petInfo/PetAccountList";
import RecordCardLayout from "@/components/recordDashboard/RecordCardLayout";
import Footer from "@/components/Footer";
import Link from "next/link";

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
  const [petId, setPetId] = useState<number | null>(null);
  return (
    <PetIdContext.Provider value={{ petId, setPetId }}>
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

const RecordDashboard = () => {
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
