import Image from "next/image";
import { useEffect, useState } from "react";

import type { PostDataType, SearchPetData } from "@/types";
import { GenderType, MediaType, SpeciesType } from "@/types/enums";
import Mask from "@/components/hint/Mask";
import PostView from "@/components/post/PostView";
import { useRouter } from "next/router";
import { fetchGetSpeciesPosts } from "@/common/fetch/post";
import Link from "next/link";
import getPetAge from "@/common/helpers/getPetAge";

interface PropsType {
  data: SearchPetData[];
}

const SearchResult: React.FC<PropsType> = ({ data }) => {
  return (
    <section className="flex flex-col px-8 py-24 max-w-[658px] w-full border-x border-stroke bg-white">
      <h1 className="text-[32px]">搜尋結果：</h1>
      <ul className="grid grid-cols-3 gap-2 mt-16">
        {data.map((account: SearchPetData) => {
          const {
            Id,
            PetAccount,
            PetName,
            PetPhoto,
            PetSpecies,
            PetGender,
            Breed,
            Birthday,
          } = account;
          return (
            <li key={`${Id}-${PetAccount}`}>
              <Link
                href={`/pet/${PetAccount}`}
                className="relative flex flex-col gap-4 p-4 w-full h-full border border-stroke rounded-[30px] "
              >
                <div className="relative flex max-w-40 max-h-40 w-full h-full aspect-square rounded-[30px] overflow-hidden">
                  <Image
                    src={PetPhoto || "/images/default-photo.png"}
                    alt={PetName}
                    priority={true}
                    fill={true}
                    sizes="100%"
                    className="w-auto h-auto object-cover duration-100 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span>{PetName}</span>
                  <span>@{PetAccount}</span>
                  <div className="flex gap-2 text-note">
                    <span>{SpeciesType[PetSpecies]}</span>
                    <span>{Breed}</span>
                    <span>{GenderType[PetGender]}</span>
                  </div>
                  <span>{getPetAge(Birthday)}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SearchResult;
