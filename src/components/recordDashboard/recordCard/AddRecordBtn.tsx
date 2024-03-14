import { IconCirclePlus } from '@tabler/icons-react';
import React, { useState } from 'react';

import Dot from '@/components/icon/Dot';
import { RecordCardType } from '@/common/types/enums';

interface PropsType {
  setFormType: (value: number) => void;
}

const AddRecordBtn: React.FC<PropsType> = ({ setFormType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 使用斷言保證轉換出來的字串是 enum CardType 可以索引的值
  const category = Object.values(RecordCardType).filter(
    (key) => typeof key === 'string'
  ) as (keyof typeof RecordCardType)[];

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const CategoryList = () => {
    return (
      <ul className='shadow-custom absolute top-[101px] max-w-[164px] rounded-3xl bg-white p-3'>
        {category.map((name, index) => {
          return (
            <li key={index}>
              <button
                type='button'
                onClick={() => setFormType(RecordCardType[name])}
                className='flex items-center gap-x-[10px] rounded-[30px] px-3 py-1 hover:bg-secondary'
              >
                <span>新增</span>
                <span className='flex items-center'>
                  <Dot name={RecordCardType[name]} size='sm' />
                  {name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className='relative flex min-h-[161px] w-full items-center justify-center rounded-[30px] border border-stroke duration-300 hover:cursor-pointer hover:bg-secondary'
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <div className='flex gap-x-2'>
        <div className='text-primary'>點擊以新增紀錄</div>
        <IconCirclePlus size={24} color={'#203170'} />
      </div>
      {isMenuOpen && <CategoryList />}
    </div>
  );
};

export default AddRecordBtn;
