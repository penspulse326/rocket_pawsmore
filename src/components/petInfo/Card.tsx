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
        <div className="relative w-[172px] h-[172px] rounded-[30px] overflow-hidden">
          <Image
            src="/images/default-photo.png"
            alt="尚未有寵物照片"
            priority={true}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
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
      <div className="relative w-[172px] h-[172px] rounded-[30px] overflow-hidden">
        <Image
          src={petPhoto || "/images/default-photo.png"}
          alt={petName}
          priority={true}
          fill={true}
          style={{ objectFit: "cover" }}
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
