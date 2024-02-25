import { useSelector } from "react-redux";
import moment from "moment";

import NoContent from "@/components/NoContent";

import { formatSymptom } from "@/common/helpers/formatMedicalData";
import getPetAge from "@/common/helpers/getPetAge";

import { RootState } from "@/common/redux/store";
import { DailyCardDataType } from "@/types";
import { PooType, UrineType, VomitType } from "@/types/enums";

const RecentCondition: React.FC = () => {
  const petList = useSelector((state: RootState) => state.petList);
  const petRecord = useSelector((state: RootState) => state.petRecord);

  const selectedPet = petList.find((pet) => pet.petId === petRecord.petId);

  const currentRecord = petRecord.data.find((event) => {
    const { card, urine, poo, vomit, symptom } = event as DailyCardDataType;
    return (
      card === 0 &&
      (urine !== 0 || poo !== 0 || vomit !== 0 || symptom !== "[]")
    );
  });

  if (!currentRecord) {
    return (
      <section className="flex flex-col gap-y-4 scrollbar-none max-w-[497px] max-h-[386px] w-full">
        <h2 className="text-2xl leading-9">近期異常狀況</h2>
        <div className="mt4 px-6 py-4 h-[335px] border border-stroke rounded-[30px]">
          <NoContent />
        </div>
      </section>
    );
  }

  const { urine, poo, vomit, symptom, targetDate, remark } =
    currentRecord as DailyCardDataType;

  const sickList = [
    { name: "尿液", value: UrineType[urine] },
    { name: "糞便", value: PooType[poo] },
    { name: "嘔吐", value: VomitType[vomit] },
    { name: "症狀", value: formatSymptom(symptom) },
  ];

  return (
    <section className="flex flex-col gap-y-4 scrollbar-none max-w-[497px] max-h-[386px] w-full">
      <h2 className="text-2xl leading-9">近期異常狀況</h2>
      <div className="mt4 px-6 py-4 h-[335px] border border-stroke rounded-[30px] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="inline-block w-[6px] h-[6px] bg-daily rounded-full"></span>
            <span className="ml-1 font-bold">日常紀錄</span>
            {/* 卡片時間 */}
            <span className="ml-2 text-note">
              {moment(targetDate).format("YYYY/M/D")}
            </span>
          </div>
          <span className="text-note">{getPetAge(selectedPet?.birthday!)}</span>
        </div>
        <ul className="flex flex-col gap-2 mt-6">
          <li className="text-note">異常</li>
          {sickList
            .filter((item) => item.value)
            .map((item, index) => (
              <li key={`${index}-${item.name}`} className="flex gap-8">
                <span className="font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
        </ul>
        <hr className="mt-2" />
        <div className="mt-4">
          <span className="text-note">備註</span>
          <p className="mt-2">{remark}</p>
        </div>
      </div>
    </section>
  );
};

export default RecentCondition;
