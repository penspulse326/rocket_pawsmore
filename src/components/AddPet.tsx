import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PropType {
  type: "already" | "yet";
}

interface ContentDataType {
  type: string;
  CONTENT: string;
}

const AddPet: React.FC<PropType> = ({ type }) => {
  const content: ContentDataType[] = [
    { type: "already", CONTENT: "有新寵物？" },
    { type: "yet", CONTENT: "尚未有寵物資料" },
  ];
  const selectedContent = content.find((item) => item.type === type);

  return (
    <div className="flex flex-col min-h-[346px] h-full justify-between items-center bg-white border border-stroke rounded-[30px] p-4 max-w-[224px] w-full">
      <div className="w-[192px] h-[192px]">
        <Image
          src="/images/default-photo.png"
          width={192}
          height={192}
          className="w-full h-full rounded-[30px]"
          alt="add pet profile"
        />
      </div>
      <div>{selectedContent?.CONTENT}</div>
      <Link
        className="bg-primary text-white px-[38px] py-2 rounded-full mb-4"
        href="/user_dashboard?to=create_pet"
        shallow={true}
      >
        新增寵物檔案
      </Link>
    </div>
  );
};

export default AddPet;
