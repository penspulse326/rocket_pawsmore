import Dot from '@/components/icon/Dot';
import { CardUnionDataType, MedicalCardDataType, MomentCardDataType } from '@/common/types';
import { MomentIdType, RecordCardType, ReserveType } from '@/common/types/enums';

interface PropsType {
  data: CardUnionDataType | null;
  onClick: () => void;
}

function RecordCardTag({ data, onClick }: PropsType) {
  if (!data) {
    return null;
  }

  const { card } = data;
  let icon;
  let title;
  let medicalData;
  let momentData;

  switch (RecordCardType[card]) {
    case '日常紀錄':
      icon = <Dot name={0} size='sm' />;
      title = '日常紀錄';
      break;
    case '醫療紀錄':
      medicalData = data as MedicalCardDataType;
      if (medicalData.cardType) {
        icon = <Dot name={1} size='sm' />;
        title = medicalData.title;
      } else {
        icon = <img src='/test/icon-exclamation.svg' alt='flag' className='h-6 w-6' />;
        title = ReserveType[medicalData.reserveType];
      }
      break;
    case '重要時刻':
      momentData = data as MomentCardDataType;
      icon = <Dot name={2} size='sm' />;
      title =
        momentData.momentId === 25
          ? `學會${momentData.momentDetails}`
          : MomentIdType[momentData.momentId];
      break;
    default:
      break;
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className='absolute bottom-8 left-8 z-10 flex max-w-36 items-center rounded-[30px] bg-white px-6 py-4 font-bold duration-300 hover:bg-stroke'
    >
      {icon}
      <span className='truncate'>{title}</span>
    </button>
  );
}

export default RecordCardTag;
