import { useContext, useState } from "react";

import Select from "@/components/form/card/Select";

import { PetIdContext } from "@/pages/record_dashboard";
import RadioCheck from "@/components/form/card/RadioCheck";
import { MedicalCardType } from "@/types/enums";
import MedicalRecordInputs from "./MedicalRecord";

interface PropsType {
  onClose: () => void;
}

const MedicalForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { petId } = useContext(PetIdContext);

  const [cardType, setCardType] = useState<MedicalCardType>();
  const [isComfirmed, setIsComfirmed] = useState(false);

  const handleCardTypeChange = (cardType: MedicalCardType) => {
    setCardType(cardType);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isComfirmed) {
      setIsComfirmed(true);
      return;
    }
  };

  return (
    <form onSubmit={() => 123} className="flex flex-col gap-6">
      <div>
        {/* 醫療卡片類型 */}
        <span className="text-note">請選擇醫療紀錄類型</span>
        <div className="flex items-center gap-4 mt-2">
          <RadioCheck
            name="醫療提醒"
            text="新增提醒日期"
            checked={cardType === MedicalCardType.就診紀錄}
            onChange={() => handleCardTypeChange(MedicalCardType.就診紀錄)}
          />
          <RadioCheck
            name="就診紀錄"
            text="新增就診紀錄"
            checked={cardType === MedicalCardType.醫療提醒}
            onChange={() => handleCardTypeChange(MedicalCardType.醫療提醒)}
          />
        </div>
      </div>
      <MedicalRecordInputs />
      <button
        type="submit"
        disabled={!cardType}
        onClick={handleSubmit}
        style={{
          background: cardType !== undefined ? "#203170" : "#808080",
        }}
        className="py-2 rounded-full bg-primary text-white"
      >
        {isComfirmed ? "儲存" : "確認"}
      </button>
    </form>
  );
};

export default MedicalForm;
