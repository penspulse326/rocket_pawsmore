import moment from "moment";

import { CardUnionDataType, MedicalCardDataType } from "@/types";
import { ReserveType } from "@/types/enums";

interface ReminderProps {
  data: CardUnionDataType;
}

const Reminder: React.FC<ReminderProps> = ({ data }) => {
  const reserveType = (data as MedicalCardDataType).reserveType;
  const reserveDate = (data as MedicalCardDataType).reserveDate;

  return (
    <ul className="flex flex-col gap-y-2">
      <ol className="flex gap-x-8">
        <li className="font-semibold">預約類型</li>
        <li>{ReserveType[reserveType]}</li>
      </ol>
      <ol className="flex gap-x-8">
        <li className="font-semibold">預約時間</li>
        <li>{moment(reserveDate).format("YYYY/M/D HH:MM")}</li>
      </ol>
    </ul>
  );
};

export default Reminder;
