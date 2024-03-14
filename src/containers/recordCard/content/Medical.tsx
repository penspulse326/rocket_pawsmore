import { IconChevronDown } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';

import { CardUnionDataType, MedicalCardDataType } from '@/common/constants/types';
import { VisitType } from '@/common/constants/types/enums';

interface MedicalDataType {
  TITLE: string;
  content: JSX.Element | null;
}

interface MedicalProps {
  data: CardUnionDataType;
}

const Medical: React.FC<MedicalProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  const { title, visitType, hospital, doctor, medicine, check, notice, cost, photo, reserveDate } =
    data as MedicalCardDataType;

  const costFormat = (number: number) => {
    if (!number) {
      return null;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const noticeArray = notice?.split('\n');

  const medicalData: MedicalDataType[] = [
    { TITLE: '標題', content: <li className='py-1'>{title}</li> },
    {
      TITLE: '事件分類',
      content: <li className='py-1'>{VisitType[visitType]}</li>,
    },
    {
      TITLE: '醫院',
      content: hospital ? <li className='py-1'>{hospital}</li> : null,
    },
    {
      TITLE: '獸醫師',
      content: doctor ? <li className='py-1'>{doctor}</li> : null,
    },
    {
      TITLE: '服用藥物',
      content: medicine ? <li className='py-1'>{medicine}</li> : null,
    },
    {
      TITLE: '臨床檢查',
      content: check ? <li className='py-1'>{check}</li> : null,
    },
    {
      TITLE: '居家注意事項',
      content: notice ? (
        <li className='py-1'>
          {noticeArray?.map((string, index) => (
            <React.Fragment key={index}>
              {string}
              {index !== noticeArray.length - 1 && <br />}
            </React.Fragment>
          ))}
        </li>
      ) : null,
    },
    {
      TITLE: '開銷',
      content: cost ? (
        <ul className='flex gap-x-1 py-1'>
          <li>NTD</li>
          <li>{costFormat(cost)}</li>
        </ul>
      ) : null,
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
            alt='photo'
          />
        </div>
      ) : null,
    },
    {
      TITLE: '回診提醒',
      content: reserveDate ? (
        <li className='py-1'>{moment(reserveDate).format('YYYY/M/D')}</li>
      ) : null,
    },
  ];

  const RelatedCard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className='flex w-full flex-col gap-y-2'>
        {/* TITLE */}
        <div className='min-w-[96px] font-semibold'>相關日常紀錄</div>
        {/* content container */}
        <button
          className='flex flex-col rounded-[30px] border border-stroke px-6 py-4'
          type='button'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* card title */}
          <ul className='flex w-full justify-between'>
            <ol className='flex items-center gap-x-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='6'
                height='6'
                viewBox='0 0 6 6'
                fill='none'
              >
                <circle cx='3' cy='3' r='3' fill='#969AFF' />
              </svg>
              <li className='font-semibold'>日常紀錄</li>
            </ol>
            <IconChevronDown className={`${!isExpanded && 'rotate-180'} duration-300`} />
          </ul>
          {/* card content */}
          {isExpanded && <></>}
        </button>
      </div>
    );
  };
  return (
    <ul className='flex flex-col gap-y-2'>
      {medicalData
        .filter((data) => data.content)
        .map((item, index) => {
          const { TITLE, content } = item;
          return (
            content && (
              <ol key={index} className='flex items-center gap-x-6'>
                <li className='flex h-8 min-w-[96px] items-center self-start font-semibold'>
                  {TITLE}
                </li>
                {content}
              </ol>
            )
          );
        })}
      {/* {related_id && <RelatedCard />} */}
    </ul>
  );
};

export default Medical;
