import React from 'react';
import { useSelector } from 'react-redux';

import { RecordCardType } from '@/common/constants/types/enums';
import { RootState } from '@/common/redux/store';

import Daily from '../TableBody/Daily';
import Medical from '../TableBody/Medical';
import Moment from '../TableBody/Moment';

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

  return <div className='text-left'>{bodyContent(cardType)}</div>;
};

export default TableBody;
