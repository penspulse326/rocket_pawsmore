import Daily from "@/containers/recordCard/content/Daily";
import Medical from "@/containers/recordCard/content/Medical";
import Moment from "@/containers/recordCard/content/Moment";
import Reminder from "@/containers/recordCard/content/Reminder";
import {
  AnniversaryCardDataType,
  CardUnionDataType,
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from "@/types";
import {
  AnniversaryType,
  MomentCategoryType,
  MomentIdType,
  RecordCardType,
  RecordEventType,
  ReserveType,
} from "@/types/enums";
import Dot from "../icon/Dot";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Anniversary from "@/containers/recordCard/content/Anniversary";

interface PropsType {
  data: CardUnionDataType | null;
}
const CardData: React.FC<PropsType> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;

  let icon;
  let title;
  let content;
  const { card } = data;

  switch (RecordEventType[card]) {
    case "日常紀錄":
      icon = <Dot name={0} size="lg" />;
      title = "日常紀錄";
      content = <Daily data={data as DailyCardDataType} />;
      break;
    case "醫療紀錄":
      let medicalData = data as MedicalCardDataType;
      if (medicalData.cardType) {
        icon = <Dot name={1} size="lg" />;
        title = medicalData.title;
        content = <Medical data={data as MedicalCardDataType} />;
      } else {
        icon = (
          <img
            src="/test/icon-exclamation.svg"
            alt="flag"
            className="w-9 h-9"
          />
        );
        title = ReserveType[medicalData.reserveType];
        content = <Reminder data={data as MedicalCardDataType} />;
      }
      break;
    case "重要時刻":
      let momentData = data as MomentCardDataType;
      icon = <Dot name={2} size="lg" />;
      title = MomentIdType[momentData.momentId];
      content = <Moment data={data as MomentCardDataType} />;
      break;
  }

  return (
    <section
      onClick={() => setIsExpanded(!isExpanded)}
      className={`${
        isExpanded
          ? "max-h-[300px] overflow-y-scroll"
          : "max-h-[68px] overflow-hidden"
      } scrollbar-none mt-8 px-6 py-4 h-full border border-stroke rounded-[30px] duration-300`}
    >
      <h3 className="flex justify-between items-center mb-6 text-2xl font-bold">
        <div className="flex items-center">
          {icon}
          {title}
        </div>
        <IconChevronDown
          className={`${isExpanded && "-rotate-180"} stroke-note duration-300`}
        />
      </h3>
      {content}
    </section>
  );
};

export default CardData;
