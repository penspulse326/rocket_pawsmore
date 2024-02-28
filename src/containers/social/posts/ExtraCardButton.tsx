import Dot from "@/components/icon/Dot";
import {
  CardUnionDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from "@/types";
import {
  MomentIdType,
  RecordCardType,
  RecordEventType,
  ReserveType,
} from "@/types/enums";

interface PropsType {
  data: CardUnionDataType | null;
  onClick: () => void;
}

const ExtraCardView: React.FC<PropsType> = ({ data, onClick }) => {
  if (!data) return null;

  const { card } = data;
  let icon;
  let title;

  switch (RecordCardType[card]) {
    case "日常紀錄":
      icon = <Dot name={0} size="sm" />;
      title = "日常紀錄";
      break;
    case "醫療紀錄":
      let medicalData = data as MedicalCardDataType;
      if (medicalData.cardType) {
        icon = <Dot name={1} size="sm" />;
        title = medicalData.title;
      } else {
        icon = (
          <img
            src="/test/icon-exclamation.svg"
            alt="flag"
            className="w-6 h-6"
          />
        );
        title = ReserveType[medicalData.reserveType];
      }
      break;
    case "重要時刻":
      let momentData = data as MomentCardDataType;
      icon = <Dot name={2} size="sm" />;
      title =
        momentData.momentId === 25
          ? `學會${momentData.momentDetails}`
          : MomentIdType[momentData.momentId];
      break;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-8 bottom-8 z-10 flex items-center px-6 py-4 max-w-36 rounded-[30px] bg-white font-bold hover:bg-stroke duration-300"
    >
      {icon}
      <span className="truncate">{title}</span>
    </button>
  );
};

export default ExtraCardView;
