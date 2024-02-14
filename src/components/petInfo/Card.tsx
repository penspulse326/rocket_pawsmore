import Image from "next/image";
import Link from "next/link";

import type { PetDataType } from "@/types";

interface PetCardProps {
  data?: PetDataType;
}

const Card: React.FC<PetCardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col gap-7 mx-auto p-4 max-w-[204px] border border-stroke rounded-[30px] bg-white">
        <Image
          src="/images/default-photo.png"
          width={172}
          height={172}
          priority={true}
          alt="尚未有寵物照片"
          className="rounded-[30px] object-cover"
        />
        <span className="text-center">尚未有寵物資料</span>
        {/* 連結待更新 */}
        <Link
          href="#"
          className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center"
        >
          新增寵物檔案
        </Link>
      </div>
    );
  }

  const { petId, petAccount, petName, petPhoto } = data;

  return (
    <div className="flex flex-col gap-4 mx-auto p-4 max-w-[204px] border border-stroke rounded-[30px] bg-white">
      <div className="w-[172px] h-[172px]">
        <Image
          src={petPhoto || "/images/default-photo.png"}
          width={172}
          height={172}
          priority
          alt={petName}
          className="w-full h-full rounded-[30px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>{petName}</span>
        <span>@{petAccount}</span>
      </div>
      <Link
        href="/test/pet_profile"
        className="mb-4 py-2 rounded-[30px] bg-primary text-white text-center hover:bg-primary/70 duration-300"
      >
        寵物檔案
      </Link>
    </div>
  );
};

export default Card;
