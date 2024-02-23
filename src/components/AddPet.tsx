import React from "react";
import Image from "next/image";
import Link from "next/link";

const AddPet: React.FC = () => {
  return (
    <Link
      className="flex flex-col gap-y-4 items-center border border-stroke rounded-[30px] p-4 max-w-[224px] w-full"
      href="/user_dashboard?to=add_pet"
    >
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
    </Link>
  );
};

export default AddPet;
