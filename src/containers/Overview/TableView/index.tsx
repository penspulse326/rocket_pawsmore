import { useState } from 'react';

import Tabs from './Tabs';
import TableTitle from './TableTitle';
import TableBody from './TableBody';

import { RecordCardType } from '@/common/constants/types/enums';

const Table: React.FC = () => {
  const [cardType, setCardType] = useState<RecordCardType>(0);

  const handleCardTypeChange = (cardType: RecordCardType) => {
    setCardType(cardType);
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
};

export default Table;
