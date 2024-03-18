import moment from 'moment';
import { useSelector } from 'react-redux';

import { DailyCardDataType } from '@/common/constants/types';
import { RecordCardType, UrineType, PooType, VomitType } from '@/common/constants/types/enums';
import { RootState } from '@/common/redux/store';
import NoContent from '@/components/NoContent';

interface FoodDataType {
  type: string;
  amount: number;
}

function Daily() {
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const { data } = petRecord;

  return (
    <>
      {data
        .filter((event) => event.card === RecordCardType.日常紀錄)
        .map((event, index) => {
          const {
            targetDate,
            water,
            weight,
            food,
            urine,
            poo,
            vomit,
            deworming,
            medicine,
            injection,
            rehab,
            remark,
            symptom,
          } = event as DailyCardDataType;

          const formattedWeight = () => {
            if (weight) {
              if (weight.length > 0 && weight.startsWith('0')) {
                return '-';
              }
              return weight.replace('.', ' ');
            }
            return '-';
          };

          const formattedSymptom = () => {
            if (symptom) {
              if (symptom !== '[]') {
                return JSON.parse(symptom).join('、');
              }
              return '-';
            }
            return null;
          };

          return (
            <ul className='flex border-t border-stroke' key={targetDate}>
              <li className={`w-[116px] pb-3 pl-4 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                {moment(targetDate).format('YYYY/M/D')}
              </li>
              {/* 一般 */}
              <ul className='flex gap-x-2 border-l border-stroke px-4'>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {formattedWeight()}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {water ? `${water} ml` : '-'}
                </li>
                <div className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {food && food !== '[]'
                    ? JSON.parse(food).map((item: FoodDataType) => {
                        const { type, amount } = item;
                        return (
                          <ul className='flex' key={type}>
                            <li>
                              {type} {amount} g
                            </li>
                          </ul>
                        );
                      })
                    : '-'}
                </div>
              </ul>
              {/* 異常 */}
              <ul className='flex gap-x-2 border-l border-stroke px-4'>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {urine !== 0 ? UrineType[urine] : '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {poo !== 0 ? PooType[poo] : '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {vomit !== 0 ? VomitType[vomit] : '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {formattedSymptom()}
                </li>
              </ul>
              {/* 日常照護 */}
              <ul className='flex gap-x-2 border-l border-stroke px-4'>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {deworming || '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {medicine || '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {injection || '-'}
                </li>
                <li className={`w-[76px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>{rehab || '-'}</li>
              </ul>
              {/* 備註 */}
              <ul className='flex gap-x-2 border-l border-stroke'>
                <li className={`w-[228px] pb-3 pl-4 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {remark || '-'}
                </li>
              </ul>
            </ul>
          );
        })}
      {data.filter((event) => event.card === RecordCardType.日常紀錄).length === 0 && (
        <div className='border-t border-stroke'>
          <NoContent />
        </div>
      )}
    </>
  );
}

export default Daily;
