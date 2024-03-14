import moment from 'moment';
import React, { useState, useContext } from 'react';

import sortByAge from '@/common/helpers/sortByAge';
import NoContent from '@/components/NoContent';
import { PetDataContext } from '@/containers/PetProfile';
import { RecordCardType } from '@/common/types/enums';

import AgeCard from '../Moment/AgeCard';
import CategoryFilter from '../Moment/CategoryFilter';

function Moments() {
  const { record, profile } = useContext(PetDataContext)!;

  const [expandCategory, setExpandCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部紀錄');

  if (!record || !profile) {
    return null;
  }
  const data = record;
  const birthday: string = moment(profile.birthday).format('YYYY-MM-DD');

  const sortedData =
    selectedCategory === '全部紀錄'
      ? sortByAge(data, birthday)
      : sortByAge(
          data.filter((event) => RecordCardType[event.card] === selectedCategory),
          birthday
        );

  return (
    <section className='flex w-full max-w-[1088px] flex-col'>
      <div className='flex justify-end' onBlur={() => setExpandCategory(false)}>
        <CategoryFilter
          isExpanded={expandCategory}
          handleExpandCategory={setExpandCategory}
          selectedCategory={selectedCategory}
          handleCategoryChange={setSelectedCategory}
        />
      </div>
      <div className='mx-auto w-full max-w-[660px]'>
        {Array.isArray(record) && record.length > 0 ? (
          <AgeCard sortedData={sortedData} />
        ) : (
          <NoContent />
        )}
      </div>
    </section>
  );
}

export default Moments;
