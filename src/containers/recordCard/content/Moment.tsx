import React, { useContext } from "react";
import Image from "next/image";
import { DataContext } from "../SingleCardLayout";
import getCategoryBgcolor from "@/common/helpers/getCategoryBgcolor";

import { MomentCardDataType } from "@/types";
import { MomentCategoryType, MomentIdType } from "@/types/enums";

interface MomentDataType {
  TITLE: string;
  content: JSX.Element | null;
}

const Moment: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { momentType, momentPhoto, momentId, momentDetails, desc } =
    data as MomentCardDataType;

  const momentData: MomentDataType[] = [
    {
      TITLE: "事件分類",
      content: (
        <li className="py-1">
          <div
            className={`px-2 rounded-[30px] ${getCategoryBgcolor(
              MomentCategoryType[momentType]
            )}`}
          >
            {MomentCategoryType[momentType]}
          </div>
        </li>
      ),
    },
    {
      TITLE: "內容",
      content: (
        <li className="py-1">
          {momentId === 25 ? momentDetails : MomentIdType[momentId]}
        </li>
      ),
    },
    {
      TITLE: "紀錄照片",
      content: momentPhoto ? (
        <div className="w-[248px] h-[186px] py-1">
          <Image
            className="rounded-[10px] w-full h-full object-cover"
            src={momentPhoto}
            width={248}
            height={186}
            alt="moment photo"
          />
        </div>
      ) : null,
    },
    {
      TITLE: "事件描述",
      content: desc ? <li className="py-1">{desc}</li> : null,
    },
  ];

  return (
    <ul className="flex flex-col gap-y-3">
      {momentData.map((moment, index) => {
        const { TITLE, content } = moment;
        return (
          content && (
            <ol key={index} className="flex gap-x-12">
              <li className="font-semibold min-w-[64px] h-8 flex items-center">
                {TITLE}
              </li>
              {content}
            </ol>
          )
        );
      })}
    </ul>
  );
};

export default Moment;
