import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { MomentCardDataType } from '@/common/constants/types';
import { RecordCardType, MomentIdType, MomentCategoryType } from '@/common/constants/types/enums';
import { RootState } from '@/common/redux/store';
import NoContent from '@/components/NoContent';

import Daily from '../TableBody/Daily';
import Medical from '../TableBody/Medical';

interface TableBodyProps {
  cardType: RecordCardType;
}

const TableBody: React.FC<TableBodyProps> = ({ cardType }) => {
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const { data } = petRecord;

  const bodyContent = (cardType: RecordCardType) => {
    switch (cardType) {
      case RecordCardType.日常紀錄:
        return <Daily />;
      case RecordCardType.醫療紀錄:
        return <Medical />;
      case RecordCardType.重要時刻:
        return <Moment />;
    }
  };

  function Moment() {
    return (
      <>
        {data
          .filter((event) => event.card === RecordCardType.重要時刻)
          .map((event, index) => {
            const { targetDate, momentType, momentId, photo, desc, momentDetails } =
              event as MomentCardDataType;

            return (
              <ul className='flex border-t border-stroke' key={index}>
                <div className={`w-[116px] pb-3 pl-4 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                  {moment(targetDate).format('YYYY/M/D')}
                </div>
                <ol className='flex h-full gap-x-8 border-l border-stroke pl-4'>
                  <li className={`w-[88px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                    {MomentCategoryType[momentType]}
                  </li>
                  <li className={`w-[158px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                    {momentId === 25 ? momentDetails : MomentIdType[momentId] || '-'}
                  </li>
                  <li className={`w-[124px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                    {photo ? (
                      <div className='h-[93px] w-[124px]'>
                        <Image
                          src={photo}
                          width={124}
                          height={93}
                          className='h-full w-full rounded-[10px] object-cover'
                          alt='紀錄照片'
                        />
                      </div>
                    ) : (
                      '-'
                    )}
                  </li>
                  <li className={`w-[344px] pb-3 ${index === 0 ? 'pt-6' : 'pt-3'}`}>
                    {desc || '-'}
                  </li>
                </ol>
              </ul>
            );
          })}
        {data.filter((event) => event.card === RecordCardType.重要時刻).length === 0 && (
          <div className='border-t border-stroke'>
            <NoContent />
          </div>
        )}
      </>
    );
  }

  return <div className='text-left'>{bodyContent(cardType)}</div>;
};

export default TableBody;
