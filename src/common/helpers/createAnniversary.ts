import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import type { RootState } from "@/common/redux/store";

import { PetDataType, MomentCardDataType } from "@/types";
import { RecordCardType, AnniversaryType } from "@/types/enums";

const useCreateAnniversaryEvent = (petId: number) => {
  const petList = useSelector((state: RootState) => state.petList);
  const [selectedPet, setSelectedPet] = useState<PetDataType>();

  const anniversaryCards = [];
  const futureYears = 10;
  // const isBirthdayExisting = originalData.some(
  //   (event) => event.category === "生日"
  // );
  // const isAdoptedDateExisting = originalData.some(
  //   (event) => event.category === "領養日"
  // );

  if (petList.length > 0 && petId !== null) {
    const foundIndex = petList.findIndex((pet) => pet.petId === petId);
    if (foundIndex !== -1) {
      setSelectedPet(petList[foundIndex]);
    }
  } else {
    setSelectedPet(petList[0]);
  }

  let birthday: string;
  let adoptedDate: string;

  if (selectedPet) {
    birthday = selectedPet.birthday;
    adoptedDate = selectedPet.adoptedDate;

    // if (!isBirthdayExisting) {
    for (let i = 0; i < futureYears; i++) {
      const birthdayDate = moment(birthday)
        .add(i, "years")
        .format("YYYY-MM-DD");
      const id = Number(`${petId}${moment(birthdayDate).format("YYYYMMDD")}`);

      const birthdayEvent = {
        petId: petId,
        cardId: id,
        // card: 999,
        desc: `第 ${i} 週年`,
        createDate: moment().format("YYYY-MM-DD"),
        targetDate: birthdayDate,
        anniversaryType: AnniversaryType.生日,
      };
      anniversaryCards.push(birthdayEvent);
    }

    // else if (!isAdoptedDateExisting) {
    for (let i = 0; i < futureYears; i++) {
      const date = moment(adoptedDate).add(i, "years").format("YYYY-MM-DD");
      const id = Number(`${petId}${moment(date).format("YYYYMMDD")}`);

      const adoptedDateEvent = {
        petId: petId,
        cardId: id,
        // card: RecordCardType,
        desc: `第 ${i} 週年`,
        createDate: moment().format("YYYY-MM-DD"),
        targetDate: date,
        anniversaryType: AnniversaryType.領養日,
      };
      anniversaryCards.push(adoptedDateEvent);
    }
  }

  return anniversaryCards;
};

export default useCreateAnniversaryEvent;
