import React from "react";
import Date from "./recordCard/Date";
import Cards from "./recordCard/Cards";
import AddRecordBtn from "./recordCard/AddRecordBtn";
import DailyForm from "@/containers/recordForm/daily/DailyForm";

const RecordCardLayout: React.FC = () => {
  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 w-full">
      <Date />
      <div className="scrollbar-none flex flex-col gap-y-4 max-h-[876px]">
        <Cards />
        <DailyForm />
      </div>
    </section>
  );
};

export default RecordCardLayout;
