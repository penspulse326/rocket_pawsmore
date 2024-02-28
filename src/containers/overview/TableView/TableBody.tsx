import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

import NoContent from "@/components/NoContent";

import { RootState } from "@/common/redux/store";
import {
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from "@/types";

import {
  RecordCardType,
  UrineType,
  PooType,
  VomitType,
  VisitType,
  MomentIdType,
  MomentCategoryType,
} from "@/types/enums";

interface TableBodyProps {
  cardType: RecordCardType;
}

const TableBody: React.FC<TableBodyProps> = ({ cardType }) => {
  const petRecord = useSelector((state: RootState) => state.petRecord);
  const data = petRecord.data;

  const bodyContent = (cardType: RecordCardType) => {
    switch (cardType) {
      case RecordCardType.日常紀錄:
        return <Daily />;
      case RecordCardType.醫療紀錄:
        return <Medical />;
      case RecordCardType.重要時刻:
        return <Moment />;
    }
  };

  const Daily = () => {
    return (
      <>
        {data
          .filter((event) => event.card === RecordCardType.日常紀錄)
          .map((event, index) => {
            const {
              targetDate,
              water,
              weight,
              food,
              urine,
              poo,
              vomit,
              deworming,
              medicine,
              injection,
              rehab,
              remark,
              symptom,
            } = event as DailyCardDataType;

            interface FoodDataType {
              type: string;
              amount: number;
            }

            const formattedWeight = () => {
              if (weight) {
                if (weight.length > 0 && weight.startsWith("0")) {
                  return "-";
                } else {
                  return weight.replace(".", " ");
                }
              } else {
                return "-";
              }
            };

            const formattedSymptom = () => {
              if (symptom) {
                if (symptom !== "[]") {
                  return JSON.parse(symptom).join("、");
                } else {
                  return "-";
                }
              }
            };

            return (
              <ul className="flex border-t border-stroke" key={index}>
                <li
                  className={`w-[116px] pl-4 pb-3 ${
                    index === 0 ? "pt-6" : "pt-3"
                  }`}
                >
                  {moment(targetDate).format("YYYY/M/D")}
                </li>
                {/* 一般 */}
                <ul className="flex gap-x-2 px-4 border-l border-stroke">
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {formattedWeight()}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {water ? `${water} ml` : "-"}
                  </li>
                  <div
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {food && food !== "[]"
                      ? JSON.parse(food).map(
                          (item: FoodDataType, index: number) => (
                            <ul className="flex" key={index}>
                              <li>
                                {item.type} {item.amount} g
                              </li>
                            </ul>
                          )
                        )
                      : "-"}
                  </div>
                </ul>
                {/* 異常 */}
                <ul className="flex gap-x-2 px-4 border-l border-stroke">
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {urine !== 0 ? UrineType[urine] : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {poo !== 0 ? PooType[poo] : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {vomit !== 0 ? VomitType[vomit] : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {formattedSymptom()}
                  </li>
                </ul>
                {/* 日常照護 */}
                <ul className="flex gap-x-2 px-4 border-l border-stroke">
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {deworming ? deworming : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {medicine ? medicine : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {injection ? injection : "-"}
                  </li>
                  <li
                    className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {rehab ? rehab : "-"}
                  </li>
                </ul>
                {/* 備註 */}
                <ul className="flex gap-x-2 border-l border-stroke">
                  <li
                    className={`w-[228px] pl-4 pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {remark ? remark : "-"}
                  </li>
                </ul>
              </ul>
            );
          })}
        {data.filter((event) => event.card === RecordCardType.日常紀錄)
          .length === 0 && (
          <div className="border-t border-stroke">
            <NoContent />
          </div>
        )}
      </>
    );
  };

  const Medical = () => {
    return (
      <>
        {data
          .filter((event) => event.card === RecordCardType.醫療紀錄)
          .map((event, index) => {
            const {
              targetDate,
              title,
              visitType,
              hospital,
              doctor,
              medicine,
              check,
              notice,
              cost,
              photo,
            } = event as MedicalCardDataType;

            return (
              <ul className="flex border-t border-stroke" key={index}>
                <div
                  className={`w-[116px] pl-4 pb-3 ${
                    index === 0 ? "pt-6" : "pt-3"
                  }`}
                >
                  {moment(targetDate).format("YYYY/M/D")}
                </div>
                <ol className="flex gap-x-2 pl-4 border-l border-stroke h-full">
                  <li
                    className={`w-[157px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {title}
                  </li>
                  <li
                    className={`w-[87px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {visitType ? VisitType[visitType] : "-"}
                  </li>
                  <li
                    className={`w-[119px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {hospital ? hospital : "-"}
                  </li>
                  <li
                    className={`w-[87px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {doctor ? doctor : "-"}
                  </li>
                  <li
                    className={`w-[119px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {medicine ? medicine : "-"}
                  </li>
                  <li
                    className={`w-[191px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {check ? check : "-"}
                  </li>
                  <li
                    className={`w-[191px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {notice ? notice : "-"}
                  </li>
                  <li
                    className={`w-[71px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {cost ? cost : "-"}
                  </li>
                  <li
                    className={`w-[125px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {photo ? (
                      <div className="w-[124px] h-[93px]">
                        <Image
                          src={photo}
                          width={124}
                          height={93}
                          className="w-full h-full rounded-[10px] object-cover"
                          alt="紀錄照片"
                        />
                      </div>
                    ) : (
                      "-"
                    )}
                  </li>
                </ol>
              </ul>
            );
          })}
        {data.filter((event) => event.card === RecordCardType.醫療紀錄)
          .length === 0 && (
          <div className="border-t border-stroke">
            <NoContent />
          </div>
        )}
      </>
    );
  };

  const Moment = () => {
    return (
      <>
        {data
          .filter((event) => event.card === RecordCardType.重要時刻)
          .map((event, index) => {
            const {
              targetDate,
              momentType,
              momentId,
              photo,
              desc,
              momentDetails,
            } = event as MomentCardDataType;

            return (
              <ul className="flex border-t border-stroke" key={index}>
                <div
                  className={`w-[116px] pl-4 pb-3 ${
                    index === 0 ? "pt-6" : "pt-3"
                  }`}
                >
                  {moment(targetDate).format("YYYY/M/D")}
                </div>
                <ol className="flex gap-x-8 pl-4 border-l border-stroke h-full">
                  <li
                    className={`w-[88px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                  >
                    {MomentCategoryType[momentType]}
                  </li>
                  <li
                    className={`w-[158px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {momentId === 25
                      ? momentDetails
                      : MomentIdType[momentId] || "-"}
                  </li>
                  <li
                    className={`w-[124px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {photo ? (
                      <div className="w-[124px] h-[93px]">
                        <Image
                          src={photo}
                          width={124}
                          height={93}
                          className="w-full h-full rounded-[10px] object-cover"
                          alt="紀錄照片"
                        />
                      </div>
                    ) : (
                      "-"
                    )}
                  </li>
                  <li
                    className={`w-[344px] pb-3 ${
                      index === 0 ? "pt-6" : "pt-3"
                    }`}
                  >
                    {desc ? desc : "-"}
                  </li>
                </ol>
              </ul>
            );
          })}
        {data.filter((event) => event.card === RecordCardType.重要時刻)
          .length === 0 && (
          <div className="border-t border-stroke">
            <NoContent />
          </div>
        )}
      </>
    );
  };

  return <div className="text-left">{bodyContent(cardType)}</div>;
};

export default TableBody;
