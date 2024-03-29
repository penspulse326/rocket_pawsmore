import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

import { CategoryContext } from "../CalendarLayout";
import { MonthContext } from "../CalendarLayout";

import getIconColor from "@/common/helpers/getIconColor";
import type { RootState } from "@/common/redux/store";

import {
  CardUnionDataType,
  MedicalCardDataType,
  MomentCardDataType,
  AnniversaryCardDataType,
} from "@/types";
import {
  RecordEventType,
  MomentIdType,
  MedicalCardType,
  ReserveType,
  AnniversaryType,
} from "@/types/enums";

const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
  const { monthState } = useContext(MonthContext);
  const { filterEvent } = useContext(CategoryContext);
  const petRecord = useSelector((state: RootState) => state.petRecord);

  const data = petRecord.data;
  const selectedMonth = moment(monthState);

  const isCurrentMonth = (prop: string) => {
    return selectedMonth.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  const eventData = data.filter((event) => {
    if (filterEvent === "全部類型") {
      return data;
    } else {
      return (
        event.card ===
        RecordEventType[filterEvent as keyof typeof RecordEventType]
      );
    }
  });

  const eventTitle = (event: CardUnionDataType) => {
    const { card } = event;
    const { title, cardType, reserveType } = event as MedicalCardDataType;
    const { momentType, momentId } = event as MomentCardDataType;
    const { anniversaryType } = event as AnniversaryCardDataType;

    switch (card) {
      case RecordEventType.日常紀錄:
        return RecordEventType[card];
      case RecordEventType.重要時刻:
        if (momentType !== 2) {
          return MomentIdType[momentId];
        } else {
          return "學會新技能";
        }
      case RecordEventType.紀念日:
        return AnniversaryType[anniversaryType];
      case RecordEventType.醫療紀錄:
        if (cardType === MedicalCardType.醫療提醒) {
          return ReserveType[reserveType] || null;
        } else if (cardType === MedicalCardType.就診紀錄) {
          return title || null;
        }
      default:
        return null;
    }
  };

  const filteredEvents = eventData.filter((event) => {
    const { targetDate } = event;
    const { visitType, reserveDate } = event as MedicalCardDataType;

    return (
      (MedicalCardType[visitType] !== "醫療提醒" &&
        targetDate &&
        moment(targetDate).format("YYYYMMDD") ===
          moment(prop).format("YYYYMMDD")) ||
      (MedicalCardType[visitType] === "醫療提醒" &&
        reserveDate &&
        moment(reserveDate).format("YYYYMMDD") ===
          moment(prop).format("YYYYMMDD"))
    );
  });

  return (
    <ul>
      {filteredEvents.slice(0, 2).map((event, index) => {
        const { card, targetDate } = event;
        const { cardType, reserveDate } = event as MedicalCardDataType;

        return (
          <ol key={index}>
            <li
              className={`flex gap-x-1 items-center ${
                (cardType !== MedicalCardType.醫療提醒 &&
                  targetDate &&
                  isCurrentMonth(targetDate)) ||
                (cardType === MedicalCardType.醫療提醒 &&
                  reserveDate &&
                  isCurrentMonth(reserveDate))
                  ? ""
                  : "opacity-20"
              }`}
            >
              {card === RecordEventType.醫療紀錄 &&
              cardType === MedicalCardType.醫療提醒 ? (
                <Image
                  src="/test/icon-exclamation.svg"
                  width={6}
                  height={24}
                  alt="exclamation mark"
                />
              ) : card === RecordEventType.紀念日 ? (
                <Image
                  src="/test/icon-flag.svg"
                  width={24}
                  height={24}
                  alt="flag icon"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    fill={getIconColor(RecordEventType[card])}
                  />
                </svg>
              )}
              {eventTitle(event) && eventTitle(event)!.length > 5 ? (
                <>
                  {`${eventTitle(event)!.slice(0, 4)}`}
                  <span className="text-note text-xs">⋯</span>
                </>
              ) : (
                eventTitle(event)
              )}
            </li>
          </ol>
        );
      })}
      {filteredEvents.length > 2 && (
        <li className="text-note text-xs">
          還有 {filteredEvents.length - 2} 項
        </li>
      )}
    </ul>
  );
};

export default EventCard;
