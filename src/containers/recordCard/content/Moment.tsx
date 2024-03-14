import Image from 'next/image';
import React from 'react';

import getCategoryBgcolor from '@/common/helpers/getCategoryBgcolor';
import { CardUnionDataType, MomentCardDataType } from '@/common/types';
import { MomentCategoryType, MomentIdType } from '@/common/types/enums';

interface MomentDataType {
  TITLE: string;
  content: JSX.Element | null;
}

interface MomentProps {
  data: CardUnionDataType;
}

const Moment: React.FC<MomentProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  const { momentType, photo, momentId, momentDetails, desc } = data as MomentCardDataType;

  const momentData: MomentDataType[] = [
    {
      TITLE: '事件分類',
      content: (
        <li className='py-1'>
          <div
            className={`rounded-[30px] px-2 ${getCategoryBgcolor(MomentCategoryType[momentType])}`}
          >
            {MomentCategoryType[momentType]}
          </div>
        </li>
      ),
    },
    {
      TITLE: '內容',
      content: <li className='py-1'>{momentId === 25 ? momentDetails : MomentIdType[momentId]}</li>,
    },
    {
      TITLE: '紀錄照片',
      content: photo ? (
        <div className='h-[186px] w-[248px] py-1'>
          <Image
            className='h-full w-full rounded-[10px] object-cover'
            src={photo}
            width={248}
            height={186}
            alt='moment photo'
          />
        </div>
      ) : null,
    },
    {
      TITLE: '事件描述',
      content: desc ? <li className='py-1'>{desc}</li> : null,
    },
  ];

  return (
    <ul className='flex flex-col gap-y-3'>
      {momentData.map((moment, index) => {
        const { TITLE, content } = moment;
        return (
          content && (
            <ol key={index} className='flex gap-x-12'>
              <li className='flex h-8 min-w-[64px] items-center font-semibold'>{TITLE}</li>
              {content}
            </ol>
          )
        );
      })}
    </ul>
  );
};

export default Moment;
