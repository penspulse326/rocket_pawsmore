import React, { useState } from "react";
import Date from "./recordCard/Date";
import Cards from "./recordCard/Cards";
import AddRecordBtn from "./recordCard/AddRecordBtn";
import { CardType } from "@/types/enums";
import RecordForm from "@/containers/recordForm";

const RecordCardLayout: React.FC = () => {
  const [formType, setFormType] = useState<number | null>(null);

  console.log(formType);

  const components: { [key: string]: JSX.Element } = {
    [CardType["日常紀錄"]]: (
      <RecordForm
        category={CardType["日常紀錄"]}
        onClose={() => setFormType(null)}
      />
    ),
    [CardType["醫療紀錄"]]: <div>醫療卡片</div>,
    [CardType["重要時刻"]]: <div>重要時刻卡片</div>,
  };

  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 w-full">
      <Date />
      <div className="scrollbar-none flex flex-col gap-y-4 max-h-[876px]">
        {formType === null && (
          <>
            <Cards />
            <AddRecordBtn setFormType={(value: number) => setFormType(value)} />
          </>
        )}
        {formType !== null && components[formType]}
      </div>
    </section>
  );
};

export default RecordCardLayout;
