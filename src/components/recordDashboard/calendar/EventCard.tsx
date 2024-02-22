import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

import { CategoryContext } from "../CalendarLayout";
import { MonthContext } from "../CalendarLayout";
import { PetIdContext } from "@/pages/record_dashboard";

import sortData from "@/common/helpers/sortData";
import getIconColor from "@/common/helpers/getIconColor";
import createAnniversary from "@/common/helpers/createAnniversary";

import type { RootState } from "@/common/redux/store";
import { PetDataType } from "@/types";

import fakeData from "@/common/lib/test/fakeData";

import { MedicalCardDataType } from "@/types";
import {
  RecordCardType,
  MomentIdType,
  MedicalCardType,
  ReserveType,
} from "@/types/enums";

const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
  const { monthState } = useContext(MonthContext);
  const { filterEvent } = useContext(CategoryContext);
  const { petId } = useContext(PetIdContext);

  const petList = useSelector((state: RootState) => state.petList);
  const [selectedPet, setSelectedPet] = useState<PetDataType>();

  useEffect(() => {
    // console.log(petId);
    // if (petList.length > 0 && petId !== null) {
    //   const foundIndex = petList.findIndex((pet) => pet.petId === petId);
    //   if (foundIndex !== -1) {
    //     setSelectedPet(petList[foundIndex]);
    //   }
    // } else {
    //   setSelectedPet(petList[0]);
    // }
  }, [petId, petList]);

  // useEffect(() => {
  //   selectedPet &&
  //     createAnniversary({
  //       birthday: selectedPet.birthday,
  //       adoptedDate: selectedPet.adoptedDate,
  //       petId: selectedPet.petId,
  //     });
  // }, [selectedPet]);

  const selectedMonth = moment(monthState);

  const isCurrentMonth = (prop: string) => {
    return selectedMonth.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  // const sortedData = sortData();

  const data = fakeData();

  console.log(data);

  const eventData = data.filter((event) => {
    if (filterEvent === "全部類型") {
      return data;
    } else {
      return (
        event.card ===
        RecordCardType[filterEvent as keyof typeof RecordCardType]
      );
    }
  });

  const eventTitle = (prop: any) => {
    const { momentType, momentId, title, visitType, reserveType } = prop;
    const card = RecordCardType[prop.card];

    switch (card) {
      case "日常紀錄":
        return card;
      case "重要時刻":
        if (momentType !== 2) {
          return MomentIdType[momentId];
        } else {
          return "學會新技能";
        }
      // case "紀念日":
      //   return category
      case "醫療紀錄":
        if (MedicalCardType[visitType] === "醫療提醒") {
          return ReserveType[reserveType] || null;
        } else if (MedicalCardType[visitType] === "就診紀錄") {
          return title || null;
        }
      default:
        return null;
    }
  };

  const filteredEvents = eventData.filter((event) => {
    const { targetDate } = event;
    const visitType = (event as MedicalCardDataType).visitType;
    const reserveDate = (event as MedicalCardDataType).reserveDate;

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
        const { targetDate } = event;
        const cardType = (event as MedicalCardDataType).cardType;
        const reserveDate = (event as MedicalCardDataType).reserveDate;

        return (
          <ol key={index}>
            <li
              className={`flex gap-x-1 items-center ${
                (MedicalCardType[cardType] !== "醫療提醒" &&
                  targetDate &&
                  isCurrentMonth(targetDate)) ||
                (MedicalCardType[cardType] === "醫療提醒" &&
                  reserveDate &&
                  isCurrentMonth(reserveDate))
                  ? ""
                  : "opacity-20"
              }`}
            >
              {RecordCardType[event.card] === "醫療紀錄" &&
              MedicalCardType[cardType] === "醫療提醒" ? (
                <Image
                  src="/test/icon-exclamation.svg"
                  width={6}
                  height={24}
                  alt="exclamation mark"
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
                    fill={getIconColor(RecordCardType[event.card])}
                  />
                </svg>
              )}
              {/* {event.card === "紀念日" && (
              <Image
                src="/test/icon-flag.svg"
                width={24}
                height={24}
                alt="flag icon"
              />
            )} */}
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
