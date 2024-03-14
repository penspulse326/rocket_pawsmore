import React, { useContext } from 'react';
import Image from 'next/image';
import { DataContext } from '../SingleCardLayout';

import getIconColor from '@/common/helpers/getIconColor';

import {
  MedicalCardDataType,
  MomentCardDataType,
  AnniversaryCardDataType,
} from '@/common/constants/types';
import {
  RecordEventType,
  MedicalCardType,
  ReserveType,
  MomentIdType,
  AnniversaryType,
} from '@/common/constants/types/enums';

const Title: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { card } = data;
  const { title, cardType, reserveType } = data as MedicalCardDataType;
  const { momentType, momentId } = data as MomentCardDataType;
  const { anniversaryType } = data as AnniversaryCardDataType;

  const isReminder: boolean =
    card === RecordEventType.醫療紀錄 && cardType === MedicalCardType.醫療提醒;
  const isAnniversary: boolean = card === RecordEventType.紀念日;

  const titleText = () => {
    if (isReminder) {
      return ReserveType[reserveType];
    } else if (card === RecordEventType.重要時刻) {
      if (momentType !== 2) {
        return MomentIdType[momentId];
      } else {
        return '新技能';
      }
    } else if (isAnniversary) {
      return AnniversaryType[anniversaryType];
    } else if (card === RecordEventType.醫療紀錄) {
      return title;
    } else {
      return RecordEventType[card];
    }
  };

  return (
    <div className='flex h-9 items-center gap-x-4'>
      {isAnniversary && <Image src='/test/icon-flag.svg' width={36} height={36} alt='flag icon' />}
      {isReminder && (
        <Image src='/test/icon-exclamation.svg' width={9} height={36} alt='exclamation symbol' />
      )}
      {!isReminder && !isAnniversary && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='11'
          height='11'
          viewBox='0 0 6 6'
          fill='none'
        >
          <circle cx='3' cy='3' r='3' fill={getIconColor(RecordEventType[card])} />
        </svg>
      )}
      <span className='text-2xl font-bold'>{titleText()}</span>
    </div>
  );
};

export default Title;
