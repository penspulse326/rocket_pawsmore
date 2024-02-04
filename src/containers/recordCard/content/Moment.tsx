import React, { useContext } from "react";
import Image from "next/image";
import { DataContext } from "../SingleCardLayout";

const Moment: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return;
  }
  const tagBackgroundColor = (category: string) => {
    switch (category) {
      case "行為表現":
        return "bg-[#F9E6FF]";
      case "驚喜":
        return "bg-[#FFF5CF]";
      case "生活習慣":
        return "bg-[#FFE9EC]";
      case "社交":
        return "bg-[#D5F0FF]";
      case "技能":
        return "bg-[#E0FFDF]";
      default:
        return "";
    }
  };
  return (
    <ul className="flex flex-col gap-y-3">
      <ol className="flex gap-x-12">
        <li className="font-semibold min-w-[64px]">事件分類</li>
        <li>
          {data.category && (
            <span
              className={`px-2 rounded-[30px] ${tagBackgroundColor(
                data.category
              )}`}
            >
              {data.category}
            </span>
          )}
        </li>
      </ol>
      <ol className="flex gap-x-12">
        <li className="font-semibold min-w-[64px]">內容</li>
        <li>{data.content}</li>
      </ol>
      <ol className="flex gap-x-12">
        <li className="font-semibold min-w-[64px]">紀錄照片</li>
        <Image
          className="rounded-[10px]"
          src={data.photo!}
          width={248}
          height={168}
          alt="moment photo"
        />
      </ol>
      <ol className="flex gap-x-12">
        <li className="font-semibold min-w-[64px]">事件描述</li>
        <li>{data.desc}</li>
      </ol>
    </ul>
  );
};

export default Moment;
