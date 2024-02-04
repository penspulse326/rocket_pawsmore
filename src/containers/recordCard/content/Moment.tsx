import React, { useContext } from "react";
import Image from "next/image";
import { DataContext } from "../SingleCardLayout";

interface MomentDataType {
  TITLE: string;
  content: JSX.Element | null;
}

const Moment: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { category, content, photo, desc } = data;

  const getCategoryBgcolor = (prop: string) => {
    switch (prop) {
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

  const momentData: MomentDataType[] = [
    {
      TITLE: "事件分類",
      content: category ? (
        <li className={`px-2 rounded-[30px] ${getCategoryBgcolor(category)}`}>
          {category}
        </li>
      ) : null,
    },
    { TITLE: "內容", content: <li>{content}</li> },
    {
      TITLE: "紀錄照片",
      content: (
        <Image
          className="rounded-[10px]"
          src={photo!}
          width={248}
          height={168}
          alt="moment photo"
        />
      ),
    },
    { TITLE: "事件描述", content: <li>{desc}</li> },
  ];

  return (
    <ul className="flex flex-col gap-y-3">
      {momentData.map((moment, index) => {
        return (
          <ol key={index} className="flex gap-x-12">
            <li className="font-semibold min-w-[64px]">{moment.TITLE}</li>
            {moment.content}
          </ol>
        );
      })}
    </ul>
  );
};

export default Moment;
