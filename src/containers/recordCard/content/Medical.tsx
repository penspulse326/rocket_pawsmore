import React, { useContext, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { IconChevronDown } from "@tabler/icons-react";
import { DataContext } from "../SingleCardLayout";

interface MedicalDataType {
  TITLE: string;
  content: JSX.Element | null;
}

const Medical: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const {
    title,
    visit_type,
    hospital,
    doctor,
    medicine,
    check,
    notice,
    cost,
    photo,
    reserve_at,
    related_id,
  } = data;

  const costFormat = (number: number) => {
    if (!number) {
      return null;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const medicalData: MedicalDataType[] = [
    { TITLE: "標題", content: <li className="py-1">{title}</li> },
    { TITLE: "事件分類", content: <li className="py-1">{visit_type}</li> },
    {
      TITLE: "醫院",
      content: hospital ? <li className="py-1">{hospital}</li> : null,
    },
    {
      TITLE: "獸醫師",
      content: doctor ? <li className="py-1">{doctor}</li> : null,
    },
    {
      TITLE: "服用藥物",
      content: medicine ? <li className="py-1">{medicine}</li> : null,
    },
    {
      TITLE: "臨床檢查",
      content: check ? <li className="py-1">{check}</li> : null,
    },
    {
      TITLE: "居家注意事項",
      content: notice ? <li className="py-1">{notice}</li> : null,
    },
    {
      TITLE: "開銷",
      content: cost ? (
        <ul className="flex gap-x-1 py-1">
          <li>NTD</li>
          <li>{costFormat(cost)}</li>
        </ul>
      ) : null,
    },
    {
      TITLE: "紀錄照片",
      content: photo ? (
        <div className="py-1">
          <Image
            className="rounded-[10px]"
            src={photo}
            width={248}
            height={186}
            alt="photo"
          />
        </div>
      ) : null,
    },
    {
      TITLE: "回診提醒",
      content: reserve_at ? (
        <li className="py-1">{moment(reserve_at).format("YYYY/M/D")}</li>
      ) : null,
    },
  ];

  const RelatedCard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="flex flex-col gap-y-2 w-full">
        {/* TITLE */}
        <div className="font-semibold min-w-[96px]">相關日常紀錄</div>
        {/* content container */}
        <button
          className="flex flex-col border border-stroke rounded-[30px] px-6 py-4"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* card title */}
          <ul className="flex justify-between w-full">
            <ol className="flex gap-x-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
              >
                <circle cx="3" cy="3" r="3" fill="#969AFF" />
              </svg>
              <li className="font-semibold">日常紀錄</li>
            </ol>
            <IconChevronDown
              className={`${!isExpanded && "rotate-180"} duration-300`}
            />
          </ul>
          {/* card content */}
          {isExpanded && <></>}
        </button>
      </div>
    );
  };
  return (
    <ul className="flex flex-col gap-y-2">
      {medicalData
        .filter((data) => data.content)
        .map((item, index) => {
          return (
            <ol key={index} className="flex gap-x-6 items-center">
              <li className="font-semibold min-w-[96px]">{item.TITLE}</li>
              {item.content}
            </ol>
          );
        })}
      {related_id && <RelatedCard />}
    </ul>
  );
};

export default Medical;
