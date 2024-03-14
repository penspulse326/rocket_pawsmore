import { RecordCardType } from '@/common/constants/types/enums';

interface TableTitleProps {
  cardType: RecordCardType;
}

const TableTitle: React.FC<TableTitleProps> = ({ cardType }) => {
  const titleContent = (cardType: RecordCardType) => {
    switch (cardType) {
      case RecordCardType.日常紀錄:
        return <Daily />;
      case RecordCardType.醫療紀錄:
        return <Medical />;
      case RecordCardType.重要時刻:
        return <Moment />;
    }
  };

  const Daily = () => {
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
            {routine.item.map((item, index) => (
              <li className='w-[76px] font-semibold' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 異常 */}
        <div className='flex flex-col gap-y-2 border-l border-stroke pb-2'>
          <span className='pl-4 text-note'>{abnormal.category}</span>
          <ul className='flex gap-x-2 px-4'>
            {abnormal.item.map((item, index) => (
              <li className='w-[76px] font-semibold' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 日常照護 */}
        <div className='flex flex-col gap-y-2 border-x border-stroke pb-2'>
          <span className='pl-4 text-note'>{dailyCares.category}</span>
          <ul className='flex gap-x-2 px-4'>
            {dailyCares.item.map((item, index) => (
              <li className='w-[76px] font-semibold' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 備註 */}
        <div className='w-full max-w-[228px] self-end px-4 pb-2 font-semibold'>備註</div>
      </div>
    );
  };

  const Medical = () => {
    return (
      <div className='flex h-16'>
        <div className='w-[116px] self-end px-4 pb-2 font-semibold'>日期</div>
        <ul className='flex h-full gap-x-2 border-l border-stroke pb-2 pl-4 font-semibold'>
          <li className='w-[157px] self-end'>標題</li>
          <li className='w-[87px] self-end'>事件分類</li>
          <li className='w-[119px] self-end'>醫院</li>
          <li className='w-[87px] self-end'>獸醫師</li>
          <li className='w-[119px] self-end'>服用藥物</li>
          <li className='w-[191px] self-end'>臨床檢查</li>
          <li className='w-[191px] self-end'>居家注意事項</li>
          <li className='w-[71px] self-end'>開銷</li>
          <li className='w-[125px] self-end'>紀錄照片</li>
        </ul>
      </div>
    );
  };

  const Moment = () => {
    return (
      <div className='flex h-16'>
        <div className='w-[116px] self-end px-4 pb-2 font-semibold'>日期</div>
        <ul className='flex h-full gap-x-8 border-l border-stroke pb-2 pl-4 font-semibold'>
          <li className='w-[88px] self-end'>事件分類</li>
          <li className='w-[158px] self-end'>內容</li>
          <li className='w-[124px] self-end'>紀錄照片</li>
          <li className='w-[344px] self-end'>事件描述</li>
        </ul>
      </div>
    );
  };

  return <div className='text-left'>{titleContent(cardType)}</div>;
};

export default TableTitle;
