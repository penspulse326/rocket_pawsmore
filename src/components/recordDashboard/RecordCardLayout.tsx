import React from "react";
import Date from "./recordCard/Date";
import Cards from "./recordCard/Cards";
import AddRecordBtn from "./recordCard/AddRecordBtn";

const RecordCardLayout: React.FC = () => {
  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 max-w-[480px]">
      <Date />
      <div className="flex flex-col gap-y-4">
        <Cards />
        <AddRecordBtn />
      </div>
    </section>
  );
};

export default RecordCardLayout;
