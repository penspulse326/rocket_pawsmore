import React from "react";
import { useSelector } from "react-redux";

import Card from "./Card";
import NoContent from "@/components/NoContent";

import { RootState } from "@/common/redux/store";
import { DailyCardDataType } from "@/types";

const Explanation: React.FC = () => {
  const petRecord = useSelector((state: RootState) => state.petRecord);

  const currentRecord = petRecord.data.find((event) => {
    const { card, urine, poo, vomit, symptom } = event as DailyCardDataType;
    return (
      card === 0 &&
      (urine !== 0 || poo !== 0 || vomit !== 0 || symptom !== "[]")
    );
  });

  if (!currentRecord) {
    return (
      <section className="max-w-[497px] w-full">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl leading-9">異常說明</h2>
          <span className="text-note">僅供參考，如有異常狀況請及早就醫。</span>
        </div>
        <div className="mt-4 px-6 py-4 h-[335px] border border-stroke rounded-[30px]">
          <NoContent />
        </div>
      </section>
    );
  }

  const symptomList = [];
  const { urine, poo, vomit, symptom } = currentRecord as DailyCardDataType;

  if (urine !== 0 && urine !== 5) {
    symptomList.push({ urine: urine });
  }
  if (poo !== 0 && poo !== 7) {
    symptomList.push({ poo: poo });
  }
  if (vomit !== 0 && vomit !== 12) {
    symptomList.push({ vomit: vomit });
  }
  const parsedSymptom = JSON.parse(symptom);
  if (parsedSymptom.length !== 0 && parsedSymptom[0] !== "其他") {
    parsedSymptom.forEach((symptomItem: string) => {
      symptomList.push({ symptom: symptomItem });
    });
  }

  return (
    <section className="max-w-[497px] w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl leading-9">異常說明</h2>
        <span className="text-note">僅供參考，如有異常狀況請及早就醫。</span>
      </div>
      <ul className="scrollbar-none flex flex-col gap-4 mt-4 p-6 max-h-[334px] border border-stroke rounded-[30px] overflow-y-scroll">
        {symptomList.map((item, index) => (
          <React.Fragment key={index}>
            <Card data={item} />
          </React.Fragment>
        ))}
        {symptomList.length === 0 && <NoContent />}
      </ul>
    </section>
  );
};

export default Explanation;
