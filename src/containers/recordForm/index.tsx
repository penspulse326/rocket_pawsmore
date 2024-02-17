import { IconX } from "@tabler/icons-react";

import { recordCard } from "@/common/lib/formText";
import DailyForm from "./daily/DailyForm";
import Dot from "@/components/icon/Dot";
import { CardType } from "@/types/enums";

interface PropsType {
  category: CardType;
  onClose: () => void;
}

const RecordForm: React.FC<PropsType> = ({ category, onClose }) => {
  const { TITLE, SUB_TITLE } = recordCard[category];
  const form = {
    [CardType["日常紀錄"]]: <DailyForm />,
    [CardType["醫療紀錄"]]: <>醫療卡</>,
    [CardType["重要時刻"]]: <>重要時刻</>,
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
      {form[category]}
    </section>
  );
};

export default RecordForm;
