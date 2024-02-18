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

import { originalData } from "@/common/lib/test/eventData";

const EventCard: React.FC<{ prop: string }> = ({ prop }) => {
  const { monthState } = useContext(MonthContext);
  const { filterEvent } = useContext(CategoryContext);
  const { petId } = useContext(PetIdContext);

  const petList = useSelector((state: RootState) => state.petList);
  const [selectedPet, setSelectedPet] = useState<PetDataType>();

  useEffect(() => {
    if (petList.length > 0 && petId !== null) {
      const foundIndex = petList.findIndex((pet) => pet.petId === petId);
      if (foundIndex !== -1) {
        setSelectedPet(petList[foundIndex]);
      }
    } else {
      setSelectedPet(petList[0]);
    }
  }, [petId, petList]);

  useEffect(() => {
    selectedPet &&
      createAnniversary({
        birthday: selectedPet.birthday,
        adoptedDate: selectedPet.adoptedDate,
        petId: selectedPet.petId,
      });
  }, [selectedPet]);

  const selectedMonth = moment(monthState);

  const isCurrentMonth = (prop: string) => {
    return selectedMonth.format("YYYYMM") === moment(prop).format("YYYYMM");
  };

  const sortedData = sortData();

  const eventData = sortedData.filter((event) => {
    if (filterEvent === "全部類型") {
      return sortedData;
    } else {
      return event.card === filterEvent;
    }
  });

  const eventTitle = (prop: any) => {
    const { card, content, title, type, reserve_type, category } = prop;
    switch (card) {
      case "日常紀錄":
        return card;
      case "重要時刻":
        return content || null;
      case "紀念日":
        return category;
      case "醫療紀錄":
        if (type === "醫療提醒") {
          return reserve_type || null;
        } else if (type === "就診紀錄") {
          return title || null;
        }
      default:
        return null;
    }
  };

  const filteredEvents = eventData.filter(
    (event) =>
      (event.type !== "醫療提醒" &&
        event.target_date &&
        moment(event.target_date).format("YYYYMMDD") ===
          moment(prop).format("YYYYMMDD")) ||
      (event.type === "醫療提醒" &&
        event.reserve_at &&
        moment(event.reserve_at).format("YYYYMMDD") ===
          moment(prop).format("YYYYMMDD"))
  );
  return (
    <ul>
      {filteredEvents.slice(0, 2).map((event, index) => (
        <ol key={index}>
          <li
            className={`flex gap-x-1 items-center ${
              (event.type !== "醫療提醒" &&
                event.target_date &&
                isCurrentMonth(event.target_date)) ||
              (event.type === "醫療提醒" &&
                event.reserve_at &&
                isCurrentMonth(event.reserve_at))
                ? ""
                : "opacity-20"
            }`}
          >
            {event.card === "醫療紀錄" && event.type === "醫療提醒" ? (
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
                <circle cx="3" cy="3" r="3" fill={getIconColor(event.card)} />
              </svg>
            )}
            {event.card === "紀念日" && (
              <Image
                src="/test/icon-flag.svg"
                width={24}
                height={24}
                alt="flag icon"
              />
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
      ))}
      {filteredEvents.length > 2 && (
        <li className="text-note text-xs">
          還有 {filteredEvents.length - 2} 項
        </li>
      )}
    </ul>
  );
};

export default EventCard;
