import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import petData from "@/common/lib/test/petData";
import PetProfile from "./PetProfile";

const PetList: React.FC<{ title: string }> = ({ title }) => {
  const [hasPets, setHasPets] = useState(true);
  const [selectedPet, setSelectedPet] = useState(-1);

  const PetCard: React.FC = () => {
    return (
      <div className="flex gap-4 flex-wrap">
        {petData.map((pet, index) => {
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
          const age = (birthday: string) => {
            const year = moment().diff(moment(birthday), "year");
            const month = moment().diff(moment(birthday), "month") % 12;
            return `${year} 歲 ${month} 月`;
          };

          return (
            <div
              className="flex flex-col gap-y-4 p-4 max-w-[224px] w-full border border-stroke rounded-[30px] bg-white"
              key={index}
            >
              <Image
                src={petPhoto}
                width={192}
                height={192}
                priority
                alt="pet avatar"
                className="rounded-[30px] object-cover"
              />
              <ul className="flex flex-col gap-1">
                <li>{petName}</li>
                <li>@{petAccount}</li>
                <ol className="text-note flex gap-x-2">
                  <li>{breed}</li>
                  <li>{petGender ? "男生" : "女生"}</li>
                </ol>
                <li className="text-note">{age(birthday)}</li>
              </ul>
              <button
                className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center"
                onClick={() => setSelectedPet(petId)}
                type="button"
              >
                編輯
              </button>
            </div>
          );
        })}
      </div>
    );
  };
  const AddPet: React.FC = () => {
    return (
      <div className="flex flex-col gap-y-4 items-center border border-stroke rounded-[30px] p-4 max-w-[224px] w-full">
        <Image
          src="/images/default-photo.png"
          width={192}
          height={192}
          className="rounded-[30px]"
          alt="add pet profile"
        />
        <div>尚未有寵物資料</div>
        <button className="bg-primary text-white px-[38px] py-2 rounded-full mb-4">
          新增寵物檔案
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div className="text-xl">
          {title}
          <button
            type="button"
            onClick={() => setHasPets(!hasPets)}
            className="ml-5 px-3 py-1 border border-stroke rounded-full"
          >
            切換有無寵物
          </button>
        </div>
        {hasPets ? (
          selectedPet !== -1 ? (
            <PetProfile petId={selectedPet} />
          ) : (
            <PetCard />
          )
        ) : (
          <AddPet />
        )}
      </div>
    </>
  );
};

export default PetList;
