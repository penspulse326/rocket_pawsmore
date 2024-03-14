import { symptomInfo } from '@/common/constants/symptomInfo';
import { UrineType, PooType, VomitType } from '@/common/constants/types/enums';

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
  const symptomType = symptomInfo.symptom.find((item) => item.type === symptom)?.type;

  return (
    <li className='flex flex-col gap-4 rounded-[30px] border border-stroke px-6 py-4'>
      <div>
        <span className='inline-block rounded-[30px] bg-primary px-3 py-1 text-white'>
          異常狀況
        </span>
        <div className='mt-1 flex gap-2'>
          <span>
            {urineType !== undefined && UrineType[urineType]}
            {pooType !== undefined && PooType[pooType]}
            {vomitType !== undefined && VomitType[vomitType]}
            {symptomType !== undefined && symptomType}
          </span>
        </div>
      </div>
      <div>
        <span className='inline-block rounded-[30px] border border-primary px-3 py-1 text-primary'>
          可能原因
        </span>
        <div className='mt-1 flex gap-2'>
          {urine && <span>{symptomInfo.urine.find((item) => item.type === urine)?.text}</span>}
          {poo && <span>{symptomInfo.poo.find((item) => item.type === poo)?.text}</span>}
          {vomit && <span>{symptomInfo.vomit.find((item) => item.type === vomit)?.text}</span>}
          {symptom && (
            <span>{symptomInfo.symptom.find((item) => item.type === symptom)?.text}</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
