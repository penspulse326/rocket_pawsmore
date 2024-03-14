import Daily from '@/containers/recordCard/content/Daily';
import Medical from '@/containers/recordCard/content/Medical';
import Moment from '@/containers/recordCard/content/Moment';
import Reminder from '@/containers/recordCard/content/Reminder';
import {
  CardUnionDataType,
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from '@/common/types';
import { MomentIdType, RecordEventType, ReserveType } from '@/common/types/enums';
import Dot from '../icon/Dot';
import { useRef, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface PropsType {
  data: CardUnionDataType | null;
}
const CardData: React.FC<PropsType> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  if (!data) return null;

  let icon;
  let title;
  let content;
  const { card } = data;

  switch (RecordEventType[card]) {
    case '日常紀錄':
      icon = <Dot name={0} size='lg' />;
      title = '日常紀錄';
      content = <Daily data={data as DailyCardDataType} />;
      break;
    case '醫療紀錄':
      let medicalData = data as MedicalCardDataType;
      if (medicalData.cardType) {
        icon = <Dot name={1} size='lg' />;
        title = medicalData.title;
        content = <Medical data={data as MedicalCardDataType} />;
      } else {
        icon = <img src='/test/icon-exclamation.svg' alt='flag' className='h-9 w-9' />;
        title = ReserveType[medicalData.reserveType];
        content = <Reminder data={data as MedicalCardDataType} />;
      }
      break;
    case '重要時刻':
      let momentData = data as MomentCardDataType;
      icon = <Dot name={2} size='lg' />;
      title =
        momentData.momentId === 25
          ? `學會${momentData.momentDetails}`
          : MomentIdType[momentData.momentId];
      content = <Moment data={data as MomentCardDataType} />;
      break;
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (isExpanded && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  return (
    <section
      ref={contentRef}
      onClick={toggleExpand}
      className={`${
        !isExpanded && 'max-h-[68px] overflow-hidden'
      } scrollbar-none mt-8 rounded-[30px] border border-stroke px-6 py-4 duration-300`}
    >
      <h3 className='mb-6 flex items-center justify-between text-2xl font-bold'>
        <div className='flex items-center'>
          {icon}
          {title}
        </div>
        <IconChevronDown className={`${isExpanded && '-rotate-180'} stroke-note duration-300`} />
      </h3>
      {content}
    </section>
  );
};

export default CardData;
