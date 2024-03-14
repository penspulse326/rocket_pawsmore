import { IconX } from '@tabler/icons-react';

import { recordCard } from '@/common/constants/formText';
import DailyForm from './daily';
import Dot from '@/components/icon/Dot';
import { RecordCardType } from '@/common/types/enums';
import MedicalForm from './medical';
import MomentForm from './moment/MomentForm';

interface PropsType {
  category: RecordCardType;
  onClose: () => void;
}

const RecordForm: React.FC<PropsType> = ({ category, onClose }) => {
  const { TITLE, SUB_TITLE } = recordCard[category];
  const forms = {
    [RecordCardType.日常紀錄]: <DailyForm onClose={onClose} />,
    [RecordCardType.醫療紀錄]: <MedicalForm onClose={onClose} />,
    [RecordCardType.重要時刻]: <MomentForm onClose={onClose} />,
  };

  return (
    <section className='scrollbar-none flex w-[416px] flex-col gap-6 rounded-[30px] border border-stroke bg-white p-6'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='flex items-center text-2xl font-bold'>
            <Dot name={category} size='lg' />
            {TITLE}
          </h2>
          {/* 關閉按鈕 */}
          <button type='button' onClick={onClose}>
            <IconX size={32} stroke={2} />
          </button>
        </div>
        <h3 className='mt-1 text-note'>{SUB_TITLE}</h3>
      </div>
      {forms[category]}
    </section>
  );
};

export default RecordForm;
