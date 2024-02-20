import { useContext, useState } from "react";
import { DateContext, PetIdContext } from "@/pages/record_dashboard";
import RadioCheck from "@/components/form/record/RadioCheck";
import { MedicalCardType } from "@/types/enums";
import MedicalRecord from "./MedicalRecord";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { fetchAddMedicalCard } from "@/common/fetch/recordCard";
import ReserveRemind from "./ReserveRemind";
import { VisitType } from "./data";

interface PropsType {
  onClose: () => void;
}

const MedicalForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { token } = useSelector((state: RootState) => state.userInfo);
  const { selectedDate } = useContext(DateContext);
  const { petId } = useContext(PetIdContext);
  const [cardType, setCardType] = useState<MedicalCardType>();
  const [isComfirmed, setIsComfirmed] = useState(false);

  const handleCardTypeChange = (cardType: MedicalCardType) => {
    setCardType(cardType);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isComfirmed) {
      setIsComfirmed(true);
      return;
    }

    const form = event.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const data: Record<string, any> = {
      card: 1,
      targetDate: selectedDate,
      cardType,
      visitType: 0,
      reserveType: 0,
    };

    fd.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetchAddMedicalCard(token, petId!, data);
    if (!response.ok) {
      alert("新增失敗，請稍後再試");
      return;
    }
    alert("新增成功");
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        {/* 醫療卡片類型 */}
        {!isComfirmed && <span className="text-note">請選擇醫療紀錄類型</span>}
        <div className="flex items-center gap-4 mt-2">
          {!isComfirmed && (
            <>
              <RadioCheck
                name="醫療提醒"
                text="新增提醒日期"
                checked={cardType === MedicalCardType.醫療提醒}
                onChange={() => handleCardTypeChange(MedicalCardType.醫療提醒)}
              />
              <RadioCheck
                name="就診紀錄"
                text="新增就診紀錄"
                checked={cardType === MedicalCardType.就診紀錄}
                onChange={() => handleCardTypeChange(MedicalCardType.就診紀錄)}
              />
            </>
          )}
          {isComfirmed && cardType === MedicalCardType.就診紀錄 && (
            <RadioCheck
              name="就診紀錄"
              text="新增就診紀錄"
              checked={cardType === MedicalCardType.就診紀錄}
              onChange={() => handleCardTypeChange(MedicalCardType.就診紀錄)}
            />
          )}
          {isComfirmed && cardType === MedicalCardType.醫療提醒 && (
            <RadioCheck
              name="醫療提醒"
              text="新增提醒日期"
              checked={cardType === MedicalCardType.醫療提醒}
              onChange={() => handleCardTypeChange(MedicalCardType.醫療提醒)}
            />
          )}
        </div>
      </div>
      {isComfirmed && cardType === MedicalCardType.就診紀錄 && (
        <MedicalRecord />
      )}
      {isComfirmed && cardType === MedicalCardType.醫療提醒 && (
        <ReserveRemind />
      )}
      <button
        type="submit"
        disabled={cardType === undefined}
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
