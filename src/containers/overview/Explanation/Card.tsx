import { symptomInfo } from "@/common/lib/symptomInfo";
import { UrineType, PooType, VomitType } from "@/types/enums";

interface Symptom {
  urine?: number;
  poo?: number;
  vomit?: number;
  symptom?: string;
}

interface CardProps {
  data: Symptom;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { urine, poo, vomit, symptom } = data;

  const urineType = symptomInfo.urine.find((item) => item.type === urine)?.type;
  const pooType = symptomInfo.poo.find((item) => item.type === poo)?.type;
  const vomitType = symptomInfo.vomit.find((item) => item.type === vomit)?.type;
  const symptomType = symptomInfo.symptom.find(
    (item) => item.type === symptom
  )?.type;

  return (
    <li className="flex flex-col gap-4 px-6 py-4 border border-stroke rounded-[30px]">
      <div>
        <span className="inline-block px-3 py-1 bg-primary text-white rounded-[30px]">
          異常狀況
        </span>
        <div className="flex gap-2 mt-1">
          <span>
            {urineType !== undefined && UrineType[urineType]}
            {pooType !== undefined && PooType[pooType]}
            {vomitType !== undefined && VomitType[vomitType]}
            {symptomType !== undefined && symptomType}
          </span>
        </div>
      </div>
      <div>
        <span className="inline-block px-3 py-1 text-primary border border-primary rounded-[30px]">
          可能原因
        </span>
        <div className="flex gap-2 mt-1">
          {urine && (
            <span>
              {symptomInfo.urine.find((item) => item.type === urine)?.text}
            </span>
          )}
          {poo && (
            <span>
              {symptomInfo.poo.find((item) => item.type === poo)?.text}
            </span>
          )}
          {vomit && (
            <span>
              {symptomInfo.vomit.find((item) => item.type === vomit)?.text}
            </span>
          )}
          {symptom && (
            <span>
              {symptomInfo.symptom.find((item) => item.type === symptom)?.text}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
