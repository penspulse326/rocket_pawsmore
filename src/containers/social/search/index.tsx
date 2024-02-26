import Image from "next/image";
import { useEffect, useState } from "react";

import type { PostDataType, SearchPetData } from "@/types";
import { PetGenderType, MediaType, SpeciesType } from "@/types/enums";
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
  const [searchData, setSearchData] = useState<SearchPetData[]>(data || []);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  return (
    <section className="flex flex-col px-8 py-24 max-w-[658px] w-full border-x border-stroke bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-[32px]">搜尋結果：</h1>
        <button
          type="button"
          className="text-note underline"
          onClick={() => setSearchData([])}
        >
          清空搜尋條件
        </button>
      </div>
      {searchData.length ? (
        <ul className="grid grid-cols-3 gap-2 mt-16">
          {searchData?.map((account: SearchPetData) => {
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
      ) : (
        <div className="flex flex-col justify-center items-center mt-24">
          <Image
            src="/icons/icon-paw-gradient.svg"
            width={162}
            height={162}
            alt="no content"
          />
          <span className="text-2xl">沒有任何搜尋結果</span>
          <span className="text-note">請檢查拼字是否有誤</span>
        </div>
      )}
    </section>
  );
};

export default SearchResult;
