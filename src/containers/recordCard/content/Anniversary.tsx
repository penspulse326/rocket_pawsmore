import React, { useContext } from 'react';

import { AnniversaryCardDataType } from '@/common/types';

import { DataContext } from '../SingleCardLayout';

const Anniversary: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { desc } = data as AnniversaryCardDataType;

  return (
    <ol className='flex gap-x-12'>
      <li className='min-w-[64px] font-semibold'>週年紀念</li>
      <li>{desc}</li>
    </ol>
  );
};

export default Anniversary;
