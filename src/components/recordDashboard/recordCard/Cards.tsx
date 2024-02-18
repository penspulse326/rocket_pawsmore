import React, { useState, useContext } from "react";
import { DateContext } from "@/pages/record_dashboard";
import SingleCardLayout from "@/containers/recordCard/SingleCardLayout";
import sortData from "@/common/helpers/sortData";

const Cards: React.FC = () => {
  const { selectedDate } = useContext(DateContext);
  const sortedData = sortData();

  const [openedCardId, setOpenedCardId] = useState(-1);
  const handleToggle = (id: number) => {
    setOpenedCardId((prevId) => (prevId === id ? -1 : id));
  };

  return (
    <>
      {sortedData
        .filter(
          (data) =>
            (data.target_date === selectedDate && data.type !== "醫療提醒") ||
            data.reserve_at === selectedDate
        )
        .map((data, index) => (
          <SingleCardLayout
            key={index}
            data={data}
            id={data.id}
            isOpened={openedCardId === data.id}
            onToggle={handleToggle}
          />
        ))}
    </>
  );
};

export default Cards;
