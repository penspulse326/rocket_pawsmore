import { IconChevronDown } from '@tabler/icons-react';

import getIconColor from '@/common/helpers/getIconColor';

// 用於展開/關閉分類、選擇不同分類的 useState hook
interface PropsType {
  isExpanded: boolean;
  handleExpandCategory: (isExpanded: boolean) => void;
  selectedCategory: string;
  handleCategoryChange: (newCategory: string) => void;
}

function CategoryFilter({
  isExpanded,
  handleExpandCategory,
  selectedCategory,
  handleCategoryChange,
}: PropsType) {
  const category: string[] = ['全部紀錄', '日常紀錄', '醫療紀錄', '重要時刻'];

  const handleToggleCategory = (prop: string) => {
    handleCategoryChange(prop);
    handleExpandCategory(!isExpanded);
  };

  return (
    <div
      className='relative flex w-[158px] items-center justify-between gap-x-1 rounded-[300px] border border-stroke px-4 py-1 hover:cursor-pointer'
      onClick={() => handleExpandCategory(!isExpanded)}
      aria-hidden='true'
    >
      <div>{selectedCategory}</div>
      <IconChevronDown size={24} />
      {isExpanded && (
        <ul className='absolute left-0.5 top-10 w-[124px] rounded-3xl bg-white p-2 shadow-[0_0_10px_0_rgba(0,0,0,0.15)]'>
          {category.map((item) => {
            return (
              <button
                className='flex items-center gap-x-1 rounded-3xl px-3 py-1 hover:bg-secondary'
                key={item}
                onClick={() => {
                  handleToggleCategory(item);
                }}
                type='button'
              >
                {item !== '全部類型' && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='6'
                    height='6'
                    viewBox='0 0 6 6'
                    fill='none'
                  >
                    <circle cx='3' cy='3' r='3' fill={getIconColor(item)} />
                  </svg>
                )}
                {item}
              </button>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategoryFilter;
