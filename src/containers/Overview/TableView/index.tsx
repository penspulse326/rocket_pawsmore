import { useState } from 'react';

import { RecordCardType } from '@/common/constants/types/enums';

import TableBody from './TableBody';
import TableTitle from './TableTitle';
import Tabs from './Tabs';

function TableView() {
  const [cardType, setCardType] = useState<RecordCardType>(0);

  const handleCardTypeChange = (prop: RecordCardType) => {
    setCardType(prop);
  };

  return (
    <div className='mt-4'>
      <Tabs cardType={cardType} setCardType={handleCardTypeChange} />
      <div className='mt-8'>
        <TableTitle cardType={cardType} />
        <TableBody cardType={cardType} />
      </div>
    </div>
  );
}

export default TableView;
