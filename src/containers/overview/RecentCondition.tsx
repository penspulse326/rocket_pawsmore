import { DailyCardDataType } from "@/types";
import Daily from "../recordCard/content/Daily";
import Dot from "@/components/icon/Dot";
import { PooType, RecordCardType, UrineType, VomitType } from "@/types/enums";
import moment from "moment";
import { formatSymptom } from "@/common/helpers/formatMedicalData";

const data: DailyCardDataType = {
  cardId: 45,
  card: 0,
  weight: "4.kg",
  food: '[{"type":"濕食","amount":300}]',
  water: 100,
  urine: 1,
  poo: 1,
  vomit: 5,
  symptom: '["腹部脹氣","其他"]',
  deworming: "全能貓",
  medicine: "內服藥",
  injection: "皮下",
  rehab: "按摩",
  remark: "你怎麼這麼會吃",
  selected:
    '["urine","poo","vomit","symptom","deworming","medicine","injection","rehab"]',
  targetDate: "2024-02-20T00:00:00",
  createDate: "2024-02-20T13:43:02.02",
};

const RecentCondition: React.FC = () => {
  const sickList = [
    { name: "尿液", value: UrineType[data.urine] },
    { name: "糞便", value: PooType[data.poo] },
    { name: "嘔吐", value: VomitType[data.vomit] },
    { name: "症狀", value: formatSymptom(data.symptom) },
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
              {moment(data.targetDate).format("YYYY/MM/DD")}
            </span>
          </div>
          <span className="text-note">1 歲 3 個月</span>
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
          <p className="mt-2">{data.remark}</p>
        </div>
      </div>
    </section>
  );
};

export default RecentCondition;
