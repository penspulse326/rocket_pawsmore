import { useContext, useState } from "react";
import { DateContext, PetIdContext } from "@/pages/record_dashboard";
import RadioCheck from "@/components/form/record/RadioCheck";
import { MedicalCardType } from "@/types/enums";
import MedicalRecord from "./MedicalRecord";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { fetchAddMedicalCard } from "@/common/fetch/recordCard";
import ReserveRemind from "./ReserveRemind";
import { mediaUpload } from "@/common/fetch/mediaManager";
import Loading from "@/components/hint/Loading";

interface PropsType {
  onClose: () => void;
}

const MedicalForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const [cardType, setCardType] = useState<MedicalCardType>();
  const [isComfirmed, setIsComfirmed] = useState(false);

  const handleCardTypeChange = (cardType: MedicalCardType) => {
    setCardType(cardType);
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        {/* 醫療卡片類型 */}
        <span className="text-note">選擇醫療紀錄類型</span>
        <div className="flex items-center gap-4 mt-2">
          {!isComfirmed && (
            <>
              <RadioCheck
                name="cardType"
                text="新增提醒日期"
                checked={cardType === MedicalCardType.醫療提醒}
                onChange={() => handleCardTypeChange(MedicalCardType.醫療提醒)}
              />
              <RadioCheck
                name="cardType"
                text="新增就診紀錄"
                checked={cardType === MedicalCardType.就診紀錄}
                onChange={() => handleCardTypeChange(MedicalCardType.就診紀錄)}
              />
            </>
          )}
        </div>
        {isComfirmed && cardType === MedicalCardType.醫療提醒 && (
          <ReserveRemind onClose={handleClose} />
        )}
        {isComfirmed && cardType === MedicalCardType.就診紀錄 && (
          <MedicalRecord onClose={handleClose} />
        )}
      </div>
      {!isComfirmed && (
        <button
          type="button"
          disabled={cardType === undefined}
          onClick={() => setIsComfirmed(true)}
          className={`${
            cardType !== undefined ? "bg-primary" : "bg-note"
          } py-2 rounded-full bg-primary text-white`}
        >
          確認
        </button>
      )}
    </section>
  );
};

export default MedicalForm;
