import { IconX } from "@tabler/icons-react";

import { recordCard } from "@/common/lib/formText";
import DailyForm from "./daily";
import Dot from "@/components/icon/Dot";
import { RecordCardType } from "@/types/enums";
import MedicalForm from "./medical";
import MomentForm from "./moment/MomentForm";

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
    <section className="scrollbar-none flex flex-col gap-6 p-6 w-[416px] max-h-[896px] border border-stroke rounded-[30px] bg-white overflow-y-scroll">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="flex items-center text-2xl font-bold">
            <Dot name={category} size="lg" />
            {TITLE}
          </h2>
          {/* 關閉按鈕 */}
          <button type="button" onClick={onClose}>
            <IconX size={32} stroke={2} />
          </button>
        </div>
        <h3 className="mt-1 text-note">{SUB_TITLE}</h3>
      </div>
      {forms[category]}
    </section>
  );
};

export default RecordForm;
