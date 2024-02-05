import React, { useContext } from "react";
import Image from "next/image";
import { DataContext } from "../SingleCardLayout";
import getCategoryBgcolor from "@/common/helpers/getCategoryBgcolor";

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

  const momentData: MomentDataType[] = [
    {
      TITLE: "事件分類",
      content: (
        <li className={`px-2 rounded-[30px] ${getCategoryBgcolor(category!)}`}>
          {category}
        </li>
      ),
    },
    { TITLE: "內容", content: <li>{content}</li> },
    {
      TITLE: "紀錄照片",
      content: photo ? (
        <Image
          className="rounded-[10px]"
          src={photo}
          width={248}
          height={168}
          alt="moment photo"
        />
      ) : null,
    },
    { TITLE: "事件描述", content: desc ? <li>{desc}</li> : null },
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
