import { useState } from "react";
import Tabs from "./Tabs";
import { RecordCardType } from "@/types/enums";
import TableTitle from "./TableTitle";

const Table: React.FC = () => {
  const [cardType, setCardType] = useState<RecordCardType>(1);

  const handleCardTypeChange = (cardType: RecordCardType) => {
    setCardType(cardType);
  };

  return (
    <div className="mt-4">
      <Tabs cardType={cardType} setCardType={handleCardTypeChange} />
      <div className="mt-8">
        <TableTitle />
      </div>
    </div>
  );
};

export default Table;
