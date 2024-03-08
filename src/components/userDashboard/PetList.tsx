import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

import PetProfile from "./PetProfile";
import AddPet from "../AddPet";

import { RootState } from "@/common/redux/store";
import getPetSpecies from "@/common/helpers/getPetSpecies";
import getPetAge from "@/common/helpers/getPetAge";

const PetList: React.FC = () => {
  const petList = useSelector((state: RootState) => state.petList);
  const [hasPets, setHasPets] = useState(false);
  const [selectedPet, setSelectedPet] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    if (Array.isArray(petList) && petList.length > 0) {
      setHasPets(true);
    }
  }, [petList, selectedPet]);

  const handleEditPet = (petId: number) => {
    setSelectedPet(petId);
    router.push(`/user_dashboard/edit_pet/${petId}`);
  };

  const PetCard: React.FC = () => {
    return (
      <div className="flex gap-4 flex-wrap">
        {petList.map((pet, index) => {
          const {
            petId,
            petName,
            petAccount,
            petSpecies,
            petGender,
            breed,
            birthday,
            petPhoto,
          } = pet;
          return (
            <div
              className="flex flex-col gap-y-4 p-4 max-w-[224px] w-full border border-stroke rounded-[30px] bg-white"
              key={index}
            >
              <div className="w-[192px] h-[192px]">
                <Image
                  src={petPhoto || "/images/default-photo.svg"}
                  width={192}
                  height={192}
                  priority
                  alt="pet avatar"
                  className="w-full h-full rounded-[30px] object-cover"
                />
              </div>
              <ul className="flex flex-col gap-1">
                <li>{petName}</li>
                <li>@{petAccount}</li>
                <ol className="text-note flex gap-x-2">
                  <li>{getPetSpecies(petSpecies)}</li>
                  <li>{breed}</li>
                  <li>{petGender ? "女生" : "男生"}</li>
                </ol>
                <li className="text-note">{getPetAge(birthday)}</li>
              </ul>
              <button
                className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center"
                onClick={() => handleEditPet(petId)}
                type="button"
              >
                編輯
              </button>
            </div>
          );
        })}
        <div className="min-h-[422px]">
          <AddPet type="already" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="text-xl">寵物檔案清單</div>
      {hasPets ? <PetCard /> : <AddPet type="yet" />}
      <PetProfile />
    </div>
  );
};

export default PetList;
