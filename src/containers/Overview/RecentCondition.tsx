import moment from 'moment';
import { useSelector } from 'react-redux';

import { DailyCardDataType } from '@/common/constants/types';
import { PooType, UrineType, VomitType } from '@/common/constants/types/enums';
import { formatSymptom } from '@/common/helpers/formatMedicalData';
import getPetAge from '@/common/helpers/getPetAge';
import { RootState } from '@/common/redux/store';
import NoContent from '@/components/NoContent';

function RecentCondition() {
  const petList = useSelector((state: RootState) => state.petList);
  const petRecord = useSelector((state: RootState) => state.petRecord);

  const selectedPet = petList.find((pet) => pet.petId === petRecord.petId);

  const currentRecord = petRecord.data.find((event) => {
    const { card, urine, poo, vomit, symptom } = event as DailyCardDataType;
    return card === 0 && (urine !== 0 || poo !== 0 || vomit !== 0 || symptom !== '[]');
  });

  if (!currentRecord) {
    return (
      <section className='scrollbar-none flex max-h-[386px] w-full max-w-[497px] flex-col gap-y-4'>
        <h2 className='text-2xl leading-9'>近期異常狀況</h2>
        <div className='h-[335px] rounded-[30px] border border-stroke px-6 py-4'>
          <NoContent />
        </div>
      </section>
    );
  }

  const { urine, poo, vomit, symptom, targetDate, remark } = currentRecord as DailyCardDataType;

  const sickList = [
    { name: '尿液', value: UrineType[urine] },
    { name: '糞便', value: PooType[poo] },
    { name: '嘔吐', value: VomitType[vomit] },
    { name: '症狀', value: formatSymptom(symptom) },
  ];

  return (
    <section className='scrollbar-none flex max-h-[386px] w-full max-w-[497px] flex-col gap-y-4'>
      <h2 className='text-2xl leading-9'>近期異常狀況</h2>
      <div className='mt4 h-[335px] overflow-y-scroll rounded-[30px] border border-stroke px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='inline-block h-[6px] w-[6px] rounded-full bg-daily' />
            <span className='ml-1 font-bold'>日常紀錄</span>
            {/* 卡片時間 */}
            <span className='ml-2 text-note'>{moment(targetDate).format('YYYY/M/D')}</span>
          </div>
          <span className='text-note'>{selectedPet && getPetAge(selectedPet.birthday)}</span>
        </div>
        <ul className='mt-6 flex w-full max-w-[449px] flex-col gap-2'>
          <li className='text-note'>異常</li>
          {sickList
            .filter((item) => item.value)
            .map((item) => {
              const { name, value } = item;

              return (
                <li key={name} className='flex w-full gap-7'>
                  <span className='w-8 font-semibold'>{name}</span>
                  <span className='max-w-[385px]'>{value}</span>
                </li>
              );
            })}
        </ul>
        <hr className='mt-2' />
        <div className='mt-4'>
          <span className='text-note'>備註</span>
          <p className='mt-2'>{remark}</p>
        </div>
      </div>
    </section>
  );
}

export default RecentCondition;
