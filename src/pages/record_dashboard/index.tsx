import React, { createContext, useState, ReactNode } from "react";
import moment from "moment";
import CalendarLayout from "@/components/recordDashboard/CalendarLayout";
import Upcoming from "@/components/recordDashboard/Upcoming";
import AccountList from "@/components/petInfo/AccountList";
import RecordCardLayout from "@/components/recordDashboard/RecordCardLayout";
import Footer from "@/components/Footer";

export interface DateContextProp {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}
export const DateContext = createContext<DateContextProp>({
  selectedDate: moment().format("YYYY-MM-DD"),
  setSelectedDate: () => {},
});

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
  const [petId, setPetId] = useState<number | null>(null);

  const DataSummaryBtn = () => {
    return (
      <button
        className="text-primary font-bold border border-stroke rounded-[30px] px-8 py-4 hover:cursor-pointer"
        type="button"
      >
        查看數據總覽
      </button>
    );
  };

  return (
    <DateProvider>
      <section className="inner mt-24 flex flex-col gap-y-16">
        <div className="flex gap-x-8">
          <div className="flex flex-col gap-y-8 max-w-[896px] w-full">
            <CalendarLayout />
            <Upcoming />
          </div>
          <div className="flex flex-col gap-y-8 max-w-[480px] w-full">
            <div className="flex justify-between">
              <AccountList setId={setPetId} />
              <DataSummaryBtn />
            </div>
            <RecordCardLayout />
          </div>
        </div>
        <Footer />
      </section>
    </DateProvider>
  );
};

export default RecordDashboard;
