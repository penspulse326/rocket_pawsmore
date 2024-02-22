import React, { useState, useContext } from "react";
import moment from "moment";

import { DateContext } from "@/pages/record_dashboard";
import SingleCardLayout from "@/containers/recordCard/SingleCardLayout";

import fakeData from "@/common/lib/test/fakeData";

import { MedicalCardDataType } from "@/types";
import { MedicalCardType } from "@/types/enums";

const Cards: React.FC = () => {
  const { selectedDate } = useContext(DateContext);
  const data = fakeData();

  const [openedCardId, setOpenedCardId] = useState(-1);
  const handleToggle = (id: number) => {
    setOpenedCardId((prevId) => (prevId === id ? -1 : id));
  };

  return (
    <>
      {data
        .filter((data) => {
          const { targetDate } = data;
          const visitType = (data as MedicalCardDataType).visitType;
          const reserveDate = (data as MedicalCardDataType).reserveDate;

          return (
            (MedicalCardType[visitType] === "醫療提醒" &&
              moment(reserveDate).format("YYYY-MM-DD") === selectedDate) ||
            (MedicalCardType[visitType] !== "醫療提醒" &&
              moment(targetDate).format("YYYY-MM-DD") === selectedDate)
          );
        })
        .map((data, index) => (
          <SingleCardLayout
            key={index}
            data={data}
            id={data.cardId}
            isOpened={openedCardId === data.cardId}
            onToggle={handleToggle}
          />
        ))}
    </>
  );
};

export default Cards;
