import React, { useContext } from "react";
import Image from "next/image";
import { DataContext } from "../SingleCardLayout";

import getIconColor from "@/common/helpers/getIconColor";

import { MedicalCardDataType, MomentCardDataType } from "@/types";
import {
  RecordCardType,
  MedicalCardType,
  ReserveType,
  MomentIdType,
} from "@/types/enums";

const Title: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { card } = data;

  const title = (data as MedicalCardDataType).title;
  const cardType = (data as MedicalCardDataType).cardType;
  const reserveType = (data as MedicalCardDataType).reserveType;

  const momentType = (data as MomentCardDataType).momentType;
  const momentId = (data as MomentCardDataType).momentId;

  const isReminder: boolean =
    RecordCardType[card] === "醫療紀錄" &&
    MedicalCardType[cardType] === "醫療提醒";
  const isAnniversary: boolean = false;
  //  card === "紀念日";

  const titleText = () => {
    if (isReminder) {
      return ReserveType[reserveType];
    } else if (card === RecordCardType.重要時刻) {
      if (momentType !== 2) {
        return MomentIdType[momentId];
      } else {
        return "新技能";
      }
    } else if (isAnniversary) {
      return "紀念日";
    } else if (RecordCardType[card] === "醫療紀錄") {
      return title;
    } else {
      return RecordCardType[card];
    }
  };

  return (
    <div className="flex gap-x-4 items-center h-9">
      {isAnniversary && (
        <Image
          src="/test/icon-flag.svg"
          width={36}
          height={36}
          alt="flag icon"
        />
      )}
      {isReminder && (
        <Image
          src="/test/icon-exclamation.svg"
          width={9}
          height={36}
          alt="exclamation symbol"
        />
      )}
      {!isReminder && !isAnniversary && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle
            cx="3"
            cy="3"
            r="3"
            fill={getIconColor(RecordCardType[card])}
          />
        </svg>
      )}
      <span className="text-2xl font-bold">{titleText()}</span>
    </div>
  );
};

export default Title;
