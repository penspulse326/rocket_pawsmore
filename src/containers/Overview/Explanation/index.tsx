import React from 'react';
import { useSelector } from 'react-redux';

import { DailyCardDataType } from '@/common/constants/types';
import { RootState } from '@/common/redux/store';
import NoContent from '@/components/NoContent';

import Card from './Card';

function Explanation() {
  const petRecord = useSelector((state: RootState) => state.petRecord);

  // 找出最新一筆有異常情況的紀錄
  const currentRecord = petRecord.data.find((event) => {
    const { card, urine, poo, vomit, symptom } = event as DailyCardDataType;
    return card === 0 && (urine !== 0 || poo !== 0 || vomit !== 0 || symptom !== '[]');
  });

  if (!currentRecord) {
    return (
      <section className='w-full max-w-[497px]'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl leading-9'>異常說明</h2>
          <span className='text-note'>僅供參考，如有異常狀況請及早就醫。</span>
        </div>
        <div className='mt-4 h-[335px] rounded-[30px] border border-stroke px-6 py-4'>
          <NoContent />
        </div>
      </section>
    );
  }

  const symptomList = [];
  const { urine, poo, vomit, symptom } = currentRecord as DailyCardDataType;

  // 排除無異常、勾選「其他」的情況
  if (urine !== 0 && urine !== 5) {
    symptomList.push({ urine });
  }
  if (poo !== 0 && poo !== 7) {
    symptomList.push({ poo });
  }
  if (vomit !== 0 && vomit !== 12) {
    symptomList.push({ vomit });
  }
  const parsedSymptom = JSON.parse(symptom);
  if (parsedSymptom.length !== 0 && parsedSymptom[0] !== '其他') {
    parsedSymptom.forEach((symptomItem: string) => {
      symptomList.push({ symptom: symptomItem });
    });
  }

  return (
    <section className='w-full max-w-[497px]'>
      <div className='flex items-center gap-2'>
        <h2 className='text-2xl leading-9'>異常說明</h2>
        <span className='text-note'>僅供參考，如有異常狀況請及早就醫。</span>
      </div>
      <ul className='scrollbar-none mt-4 flex max-h-[334px] flex-col gap-4 overflow-y-scroll rounded-[30px] border border-stroke p-6'>
        {symptomList.map((item) => (
          <React.Fragment key={JSON.stringify(Object.keys(item))}>
            <Card data={item} />
          </React.Fragment>
        ))}
        {symptomList.length === 0 && <NoContent />}
      </ul>
    </section>
  );
}

export default Explanation;
