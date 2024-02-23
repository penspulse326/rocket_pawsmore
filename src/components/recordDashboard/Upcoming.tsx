import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

import { PetIdContext } from "@/pages/record_dashboard";
import { RootState } from "@/common/redux/store";

import { PetDataType, MedicalCardDataType } from "@/types";
import { MedicalCardType, ReserveType } from "@/types/enums";

const Upcoming: React.FC = () => {
  const { petId } = useContext(PetIdContext);
  const petList = useSelector((state: RootState) => state.petList);
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const data = petRecord.data;

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

  if (!selectedPet) {
    return null;
  }

  const Reminders: React.FC = () => {
    const eventData = data
      .filter((event) => {
        const cardType = (event as MedicalCardDataType).cardType;
        const reserveDate = (event as MedicalCardDataType).reserveDate;

        return (
          cardType === MedicalCardType.醫療提醒 &&
          reserveDate &&
          moment(reserveDate).isAfter(moment())
        );
      })
      .sort((a, b) => {
        const reserveDateA = (a as MedicalCardDataType).reserveDate;
        const reserveDateB = (b as MedicalCardDataType).reserveDate;

        return moment(reserveDateA).diff(moment(reserveDateB));
      })
      .slice(0, 3);

    return (
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="flex gap-x-1 items-center">
          <Image
            src="/test/icon-exclamation.svg"
            width={6}
            height={24}
            alt="exclamation mark"
          />
          <div>醫療提醒</div>
        </div>
        {eventData.map((event, index) => {
          const reserveDate = (event as MedicalCardDataType).reserveDate;
          const reserveType = (event as MedicalCardDataType).reserveType;

          return (
            <ul className="flex gap-x-4" key={index}>
              <li className="w-[42px]">{moment(reserveDate).format("M/D")}</li>
              <li>{ReserveType[reserveType]}</li>
            </ul>
          );
        })}
      </div>
    );
  };
  const Moments: React.FC = () => {
    const { birthday, adoptedDate } = selectedPet;

    return (
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="flex gap-x-1 items-center">
          <Image
            src="/test/icon-flag.svg"
            width={24}
            height={24}
            alt="flag icon"
          />
          <div>紀念日</div>
        </div>
        <ul className="flex gap-x-4">
          <li className="w-[42px]">{moment(birthday).format("M/D")}</li>
          <li>生日</li>
        </ul>
        {adoptedDate && (
          <ul className="flex gap-x-4">
            <li className="w-[42px]">{moment(adoptedDate).format("M/D")}</li>
            <li>領養日</li>
          </ul>
        )}
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-y-2 max-w-[832px] w-full">
      <div className="text-note">即將到來</div>
      <div className="flex border border-stroke rounded-[30px] p-8 min-h-[184px] h-full">
        <Reminders />
        <Moments />
      </div>
    </section>
  );
};

export default Upcoming;
