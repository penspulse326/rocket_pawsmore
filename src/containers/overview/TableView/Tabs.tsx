import Dot from '@/components/icon/Dot';
import { RecordCardType } from '@/common/constants/types/enums';

interface PropsType {
  cardType: RecordCardType;
  setCardType: (type: RecordCardType) => void;
}

const Tabs: React.FC<PropsType> = ({ cardType, setCardType }) => {
  const btnStyle = (type: RecordCardType) => {
    return cardType === type
      ? 'flex items-center px-4 py-2 rounded-full border border-primary bg-primary text-white duration-300'
      : 'flex items-center px-4 py-2 rounded-full border border-stroke bg-white duration-300';
  };

  return (
    <div>
      <h3>紀錄類型</h3>
      <div className='mt-2 flex gap-4'>
        <button
          type='button'
          onClick={() => setCardType(RecordCardType.日常紀錄)}
          className={btnStyle(RecordCardType.日常紀錄)}
        >
          <Dot name={RecordCardType.日常紀錄} size='sm' />
          日常紀錄
        </button>
        <button
          type='button'
          onClick={() => setCardType(RecordCardType.醫療紀錄)}
          className={btnStyle(RecordCardType.醫療紀錄)}
        >
          <Dot name={RecordCardType.醫療紀錄} size='sm' />
          就診紀錄
        </button>
        <button
          type='button'
          onClick={() => setCardType(RecordCardType.重要時刻)}
          className={btnStyle(RecordCardType.重要時刻)}
        >
          <Dot name={RecordCardType.重要時刻} size='sm' />
          重要時刻
        </button>
      </div>
    </div>
  );
};

export default Tabs;
