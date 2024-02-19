import React, { useContext, useState } from "react";
import Date from "./recordCard/Date";
import Cards from "./recordCard/Cards";
import AddRecordBtn from "./recordCard/AddRecordBtn";
import RecordForm from "@/containers/recordForm";
import { PetIdContext } from "@/pages/record_dashboard";

import { RecordCardType } from "@/types/enums";

const RecordCardLayout: React.FC = () => {
  const { petId } = useContext(PetIdContext);
  const [formType, setFormType] = useState<number | null>(null);

  const components: { [key: string]: JSX.Element } = {
    [RecordCardType.日常紀錄]: (
      <RecordForm
        category={RecordCardType.日常紀錄}
        onClose={() => setFormType(null)}
      />
    ),
    [RecordCardType.醫療紀錄]: (
      <RecordForm
        category={RecordCardType.醫療紀錄}
        onClose={() => setFormType(null)}
      />
    ),
    [RecordCardType.重要時刻]: (
      <RecordForm
        category={RecordCardType.重要時刻}
        onClose={() => setFormType(null)}
      />
    ),
  };

  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 w-full">
      <Date />
      <div className="scrollbar-none flex flex-col gap-y-4 max-h-[876px]">
        {formType === null ? (
          <>
            <Cards />
            <AddRecordBtn setFormType={(value: number) => setFormType(value)} />
          </>
        ) : (
          components[formType]
        )}
      </div>
    </section>
  );
};

export default RecordCardLayout;
