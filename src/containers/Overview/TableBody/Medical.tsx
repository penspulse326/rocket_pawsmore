import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { MedicalCardDataType } from '@/common/constants/types';
import { RecordCardType, MedicalCardType, VisitType } from '@/common/constants/types/enums';
import { RootState } from '@/common/redux/store';
import NoContent from '@/components/NoContent';

function Medical() {
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const { data } = petRecord;

  const costFormat = (number: number) => {
    if (!number) {
      return null;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <>
      {data
        .filter((event) => {
          const { card, cardType } = event as MedicalCardDataType;

          return card === RecordCardType.醫療紀錄 && cardType !== MedicalCardType.醫療提醒;
        })
        .sort((a, b) => {
          const targetDateA = a.targetDate;
          const targetDateB = b.targetDate;

          return moment(targetDateB).diff(moment(targetDateA));
        })
        .map((event, index) => {
          const {
            targetDate,
            title,
            visitType,
            hospital,
            doctor,
            medicine,
            check,
            notice,
            cost,
            photo,
            createDate,
          } = event as MedicalCardDataType;

          const noticeArray = notice?.split('\n');

          return (
            <ul className='flex border-t border-stroke' key={createDate}>
              <div className={`w-[116px] pb-3 pl-4 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                {moment(targetDate).format('YYYY/M/D')}
              </div>
              <ol className='flex h-full gap-x-2 border-l border-stroke pl-4'>
                <li className={`w-[157px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>{title}</li>
                <li className={`w-[87px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {visitType ? VisitType[visitType] : '-'}
                </li>
                <li className={`w-[119px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {hospital || '-'}
                </li>
                <li className={`w-[87px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {doctor || '-'}
                </li>
                <li className={`w-[119px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {medicine || '-'}
                </li>
                <li className={`w-[191px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {check || '-'}
                </li>
                <li className={`w-[191px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {notice
                    ? noticeArray?.map((string, arrayIndex) => (
                        <React.Fragment key={string}>
                          {string}
                          {arrayIndex !== noticeArray.length - 1 && <br />}
                        </React.Fragment>
                      ))
                    : '-'}
                </li>
                <li className={`w-[71px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {cost ? costFormat(cost) : '-'}
                </li>
                <li className={`w-[125px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {photo ? (
                    <div className='h-[93px] w-[124px]'>
                      <Image
                        src={photo}
                        width={124}
                        height={93}
                        className='h-full w-full rounded-[10px] object-cover'
                        alt='紀錄照片'
                        priority={false}
                      />
                    </div>
                  ) : (
                    '-'
                  )}
                </li>
              </ol>
            </ul>
          );
        })}
      {data.filter((event) => event.card === RecordCardType.醫療紀錄).length === 0 && (
        <div className='border-t border-stroke'>
          <NoContent />
        </div>
      )}
    </>
  );
}

export default Medical;
