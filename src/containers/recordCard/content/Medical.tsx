import React, { useContext } from "react";
import Image from "next/image";
import moment from "moment";
import { DataContext } from "../SingleCardLayout";

const Medical: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }

  const costFormat = (number: number | undefined) => {
    if (number !== undefined) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return;
  };

  const medicalData = [
    { title: "標題", content: data.title },
    { title: "事件分類", content: "" },
    { title: "醫院", content: data.hospital },
    { title: "獸醫師", content: data.doctor },
    { title: "服用藥物", content: data.medicine },
    { title: "臨床檢查", content: data.check },
    { title: "居家注意事項", content: data.notice },
  ];
  return (
    <div className="flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-2">
        {medicalData
          .filter((item) => item.content)
          .map((item, index) => {
            return (
              <ol key={index} className="flex gap-x-6">
                <li className="font-semibold min-w-[96px]">{item.title}</li>
                <li>{item.content}</li>
              </ol>
            );
          })}
        {data.cost && (
          <ol className="flex gap-x-6">
            <li className="font-semibold min-w-[96px]">開銷</li>
            <ul className="flex gap-x-1">
              <li>NTD</li>
              <li>{costFormat(data.cost)}</li>
            </ul>
          </ol>
        )}
        {data.photo && (
          <ol className="flex gap-x-6">
            <li className="font-semibold min-w-[96px]">紀錄照片</li>
            <Image
              className="rounded-[10px]"
              src={data.photo}
              width={248}
              height={186}
              alt="photo"
            />
          </ol>
        )}
        {data.remind_at && (
          <ol className="flex gap-x-6">
            <li className="font-semibold min-w-[96px]">回診提醒</li>
            <li>{moment(data.remind_at).format("YYYY/M/D")}</li>
          </ol>
        )}
      </ul>
    </div>
  );
};

export default Medical;
