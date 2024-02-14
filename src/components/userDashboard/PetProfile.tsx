import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Image from "next/image";
import moment from "moment";
import {
  IconPhoto,
  IconCalendarPlus,
  IconChevronRight,
} from "@tabler/icons-react";

import { RootState } from "@/common/redux/store";
import getPetSpecies from "@/common/helpers/getPetSpecies";

import ErrorMessage from "../ErrorMessage";
import { errorText } from "@/common/lib/messageText";

const PetProfile = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const petList = useSelector((state: RootState) => state.petList);

  const router = useRouter();
  const { petId } = router.query;

  const selectedPet = petList.find((pet) => pet.petId === Number(petId));

  const [breed, setBreed] = useState(selectedPet && selectedPet.breed);
  const [name, setName] = useState(selectedPet && selectedPet.petName);
  const [account, setAccount] = useState(selectedPet && selectedPet.petAccount);
  const [info, setInfo] = useState(selectedPet && selectedPet.petIntro);
  const [link, setLink] = useState(selectedPet && selectedPet.link);
  const [birthday, setBirthday] = useState(
    selectedPet && moment(selectedPet.birthday).format("YYYY-MM-DD")
  );
  const [adoptedDate, setAdoptedDate] = useState(
    selectedPet && moment(selectedPet.adopteddDate).format("YYYY-MM-DD")
  );

  if (!selectedPet) {
    return null;
  }

  const { petPhoto, petSpecies, petGender } = selectedPet;

  const rowsOfTextarea: number = info ? info.split("\n").length : 1;

  const formData = {
    petId: petId,
    petAccount: account,
    petName: name,
    petSpecies: petSpecies,
    petGender: petGender,
    breed: breed,
    birthday: birthday,
    adoptedDate: adoptedDate,
    petPhoto: petPhoto,
    petIntro: info,
    link: link,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/pet/update/${petId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {}
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-y-8 max-w-[1192px] mt-8 ml-[144px]">
      <ul className="flex text-xl gap-x-4 items-center">
        <li className="hover:cursor-pointer" onClick={handleGoBack}>
          寵物檔案清單
        </li>
        <IconChevronRight />
        <li>{name}</li>
      </ul>
      <form
        className="flex flex-col gap-y-12 border border-stroke p-8 rounded-[30px] max-w-[728px] w-full"
        onSubmit={handleSubmit}
      >
        {/* profile */}
        <div className="flex flex-col gap-y-4">
          <div className="text-xl">寵物基本資料</div>
          <div className="flex gap-x-12">
            {/* photo */}
            <div className="flex flex-col gap-y-4 max-w-[264px] w-full">
              <div>寵物照片</div>
              <div className="w-[168px] h-[168px] mx-auto">
                <Image
                  src={petPhoto || "/images/default-photo.svg"}
                  width={168}
                  height={168}
                  alt="user avatar"
                  className="w-full h-full border border-stroke rounded-full object-cover"
                />
              </div>
              <button className="flex gap-x-2 mx-auto" type="button">
                <IconPhoto size={24} color={"#203170"} />
                <span className="text-primary">上傳照片</span>
              </button>
            </div>
            {/* bio */}
            <div className="flex flex-col gap-y-4 max-w-[352px] w-full">
              <ul className="flex flex-col gap-y-1">
                <li>物種</li>
                <li className="bg-primary text-white px-4 py-2 rounded-full self-start">
                  {getPetSpecies(petSpecies)}
                </li>
              </ul>
              <ul className="flex flex-col gap-y-1">
                <li>性別</li>
                <li className="bg-primary text-white px-4 py-2 rounded-full self-start">
                  {petGender ? "女生" : "男生"}
                </li>
              </ul>
              <ul className="flex flex-col gap-y-1">
                <ol className="flex justify-between">
                  <li>
                    品種<span className="text-error font-semibold">*</span>
                  </li>
                  <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
                </ol>
                <input
                  type="text"
                  value={breed}
                  className="border border-stroke rounded-[10px] px-4 py-3"
                  onChange={(e) => setBreed(e.target.value)}
                />
              </ul>
              <ul className="flex flex-col gap-y-1">
                <ol className="flex justify-between">
                  <label htmlFor="birthday">
                    生日<span className="text-error font-semibold">*</span>
                  </label>
                  <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
                </ol>
                <ol className="flex gap-x-2 relative">
                  <IconCalendarPlus size={24} className="absolute" />
                  <input
                    type="date"
                    value={birthday}
                    id="birthday"
                    className="pl-8 w-full"
                    onChange={(e) =>
                      setBirthday(moment(e.target.value).format("YYYY-MM-DD"))
                    }
                  />
                </ol>
              </ul>
              <ul className="flex flex-col gap-y-1">
                <label htmlFor="adoptedDate">領養日</label>
                <ol className="flex gap-x-2 relative">
                  <IconCalendarPlus size={24} className="absolute" />
                  <input
                    type="date"
                    value={adoptedDate || ""}
                    id="adoptedDate"
                    className="pl-8 w-full"
                    onChange={(e) =>
                      setAdoptedDate(
                        moment(e.target.value).format("YYYY-MM-DD")
                      )
                    }
                  />
                </ol>
              </ul>
            </div>
          </div>
        </div>
        {/* account */}
        <div className="flex flex-col gap-y-4 w-full">
          <div className="text-xl">寵物帳號資料</div>
          <div className="flex gap-x-8 justify-between">
            {/* pet account */}
            <ul className="flex flex-col gap-y-1 max-w-[316px] w-full">
              <ol className="flex justify-between">
                <li>
                  寵物帳號<span className="text-error font-semibold">*</span>
                </li>
                <ErrorMessage>{errorText.ACCOUNT_EXIST}</ErrorMessage>
              </ol>
              <input
                type="text"
                value={account}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setAccount(e.target.value)}
              />
            </ul>
            {/* pet name */}
            <ul className="flex flex-col gap-y-1 max-w-[316px] w-full">
              <ol className="flex justify-between">
                <li>
                  寵物名稱<span className="text-error font-semibold">*</span>
                </li>
                <ErrorMessage>{errorText.REQUIRED_FILED}</ErrorMessage>
              </ol>
              <input
                type="text"
                value={name}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setName(e.target.value)}
              />
            </ul>
          </div>
          <div className="flex gap-x-8 justify-between">
            {/* info */}
            <div className="flex flex-col gap-y-1 max-w-[316px] w-full">
              <label htmlFor="info">寵物簡介</label>
              <textarea
                name="info"
                id="info"
                value={info}
                maxLength={150}
                rows={rowsOfTextarea}
                className="border border-stroke rounded-[10px] px-4 py-3 h-auto resize-none"
                onChange={(e) => setInfo(e.target.value)}
              ></textarea>
            </div>
            {/* link */}
            <div className="flex flex-col gap-y-1 max-w-[316px] w-full">
              <label htmlFor="link">連結</label>
              <input
                type="text"
                id="link"
                value={link}
                className="border border-stroke rounded-[10px] px-4 py-3"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="text-white bg-primary rounded-[300px] px-[104px] py-2 self-center"
          type="submit"
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default PetProfile;
