import { memo } from 'react';

import { RecordCardType } from '@/common/constants/types/enums';

interface PropsType {
  cardType: RecordCardType;
}

function TableTitle({ cardType }: PropsType) {
  const Daily = memo(function DailyComponent() {
    const routine = { category: '一般', item: ['體重', '飲水量', '進食'] };
    const abnormal = {
      category: '異常',
      item: ['尿液', '糞便', '嘔吐', '症狀'],
    };
    const dailyCares = {
      category: '日常照護',
      item: ['驅蟲', '用藥', '注射', '復健'],
    };

    return (
      <div className='flex'>
        <div className='w-[116px] self-end pb-2 pl-4 font-semibold'>日期</div>
        {/* 一般 */}
        <div className='flex flex-col gap-y-2 border-l border-stroke pb-2'>
          <span className='pl-4 text-note'>{routine.category}</span>
          <ul className='flex gap-x-2 px-4'>
            {routine.item.map((item) => (
              <li className='w-[76px] font-semibold' key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 異常 */}
        <div className='flex flex-col gap-y-2 border-l border-stroke pb-2'>
          <span className='pl-4 text-note'>{abnormal.category}</span>
          <ul className='flex gap-x-2 px-4'>
            {abnormal.item.map((item) => (
              <li className='w-[76px] font-semibold' key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 日常照護 */}
        <div className='flex flex-col gap-y-2 border-x border-stroke pb-2'>
          <span className='pl-4 text-note'>{dailyCares.category}</span>
          <ul className='flex gap-x-2 px-4'>
            {dailyCares.item.map((item) => (
              <li className='w-[76px] font-semibold' key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 備註 */}
        <div className='w-full max-w-[228px] self-end px-4 pb-2 font-semibold'>備註</div>
      </div>
    );
  });

  const Medical = memo(function MedicalComponent() {
    const medicalTitle = [
      { title: '標題', width: '157px' },
      { title: '事件分類', width: '87px' },
      { title: '醫院', width: '119px' },
      { title: '獸醫師', width: '87px' },
      { title: '服用藥物', width: '119px' },
      { title: '臨床檢查', width: '191px' },
      { title: '居家注意事項', width: '191px' },
      { title: '開銷', width: '71px' },
      { title: '紀錄照片', width: '125px' },
    ];

    return (
      <div className='flex h-16'>
        <div className='w-[116px] self-end px-4 pb-2 font-semibold'>日期</div>
        <ul className='flex h-full gap-x-2 border-l border-stroke pb-2 pl-4 font-semibold'>
          {medicalTitle.map((item) => {
            const { title, width } = item;
            return (
              <li className='self-end' style={{ width }} key={title}>
                {title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const Moment = memo(function MomentComponent() {
    const momentTitle = [
      { title: '事件分類', width: '88px' },
      { title: '內容', width: '158px' },
      { title: '紀錄照片', width: '124px' },
      { title: '事件描述', width: '344px' },
    ];
    return (
      <div className='flex h-16'>
        <div className='w-[116px] self-end px-4 pb-2 font-semibold'>日期</div>
        <ul className='flex h-full gap-x-8 border-l border-stroke pb-2 pl-4 font-semibold'>
          {momentTitle.map((item) => {
            const { title, width } = item;
            return (
              <li className='self-end' style={{ width }} key={title}>
                {title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const titleContent = (prop: RecordCardType) => {
    switch (prop) {
      case RecordCardType.日常紀錄:
        return <Daily />;
      case RecordCardType.醫療紀錄:
        return <Medical />;
      case RecordCardType.重要時刻:
        return <Moment />;
      default:
        return null;
    }
  };

  return <div className='text-left'>{titleContent(cardType)}</div>;
}

export default TableTitle;
