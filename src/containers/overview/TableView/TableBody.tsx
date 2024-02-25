import React from "react";
import Image from "next/image";
import moment from "moment";

import {
  RecordCardType,
  UrineType,
  PooType,
  VomitType,
  VisitType,
  MomentIdType,
  MomentCategoryType,
} from "@/types/enums";

const data = {
  petId: 24,
  dailyCards: [
    {
      cardId: 45,
      card: 0,
      weight: "4.kg",
      food: '[{"type":"濕食","amount":300}, {"type":"乾食","amount":300}]',
      water: 100,
      urine: 1,
      poo: 1,
      vomit: 5,
      symptom: '["腹部脹氣","其他"]',
      deworming: "全能貓",
      medicine: "內服藥",
      injection: "皮下",
      rehab: "按摩",
      remark: "你怎麼這麼會吃你怎麼這麼會吃你怎麼這麼會吃你怎麼這麼會吃",
      selected:
        '["urine","poo","vomit","symptom","deworming","medicine","injection","rehab"]',
      targetDate: "2024-02-20T00:00:00",
      createDate: "2024-02-20T13:43:02.02",
    },
    {
      cardId: 48,
      card: 0,
      weight: "0.kg",
      food: "[]",
      water: 300,
      urine: 0,
      poo: 1,
      vomit: 0,
      symptom: "[]",
      deworming: "",
      medicine: "",
      injection: "",
      rehab: "",
      remark: "",
      selected: '["poo"]',
      targetDate: "2024-02-21T00:00:00",
      createDate: "2024-02-21T03:15:19.317",
    },
    {
      cardId: 53,
      card: 0,
      weight: "0.kg",
      food: "[]",
      water: 0,
      urine: 0,
      poo: 0,
      vomit: 0,
      symptom: '["傷口"]',
      deworming: "",
      medicine: "",
      injection: "",
      rehab: "",
      remark: "",
      selected: '["symptom"]',
      targetDate: "2024-01-17T00:00:00",
      createDate: "2024-02-21T14:55:19.763",
    },
    {
      cardId: 59,
      card: 0,
      weight: "3.kg",
      food: "[]",
      water: 0,
      urine: 0,
      poo: 0,
      vomit: 0,
      symptom: "[]",
      deworming: "",
      medicine: "",
      injection: "",
      rehab: "",
      remark: "",
      selected: "[]",
      targetDate: "2024-02-01T00:00:00",
      createDate: "2024-02-24T16:56:36.093",
    },
  ],
  medicalCards: [
    {
      card: 1,
      cardId: 36,
      cardType: 1,
      reserveType: 0,
      visitType: 1,
      title: "拉肚子",
      hospital: "寵愛動物醫院",
      doctor: "吳醫師",
      medicine: "口服藥",
      check: "基本檢查",
      notice: "少量多餐",
      cost: 800,
      photo:
        "https://res.cloudinary.com/djlffjjc9/image/upload/v1708435726/medical/x5nlupgikg8stelsmlmx.jpg",
      remind: null,
      selected: null,
      targetDate: "2024-02-20T00:00:00",
      reserveDate: null,
      remindDate: "2024-02-20T16:00:00",
      createDate: "2024-02-20T13:28:48.517",
    },

    {
      card: 1,
      cardId: 67,
      cardType: 1,
      reserveType: 0,
      visitType: 1,
      title: "測試",
      hospital: "",
      doctor: "",
      medicine: "",
      check: "",
      notice: "",
      cost: null,
      photo: null,
      remind: null,
      selected: null,
      targetDate: "2024-02-20T00:00:00",
      reserveDate: null,
      remindDate: null,
      createDate: "2024-02-23T09:53:16.45",
    },
    {
      card: 1,
      cardId: 68,
      cardType: 1,
      reserveType: 0,
      visitType: 1,
      title: "測試",
      hospital: "",
      doctor: "",
      medicine: "",
      check: "",
      notice: "",
      cost: null,
      photo: null,
      remind: null,
      selected: null,
      targetDate: "2024-02-23T00:00:00",
      reserveDate: null,
      remindDate: null,
      createDate: "2024-02-23T09:53:53.003",
    },
    {
      card: 1,
      cardId: 72,
      cardType: 1,
      reserveType: 0,
      visitType: 1,
      title: "測試標題",
      hospital: "",
      doctor: "",
      medicine: "",
      check: "",
      notice: "",
      cost: null,
      photo: null,
      remind: null,
      selected: null,
      targetDate: "2024-02-22T00:00:00",
      reserveDate: null,
      remindDate: null,
      createDate: "2024-02-23T10:00:26.62",
    },
    {
      card: 1,
      cardId: 75,
      cardType: 1,
      reserveType: 0,
      visitType: 4,
      title: "20:55測試",
      hospital: "",
      doctor: "",
      medicine: "",
      check: "",
      notice: "",
      cost: null,
      photo: null,
      remind: null,
      selected: null,
      targetDate: "2024-02-23T00:00:00",
      reserveDate: null,
      remindDate: null,
      createDate: "2024-02-23T12:55:10.25",
    },
  ],
  momentCards: [
    {
      cardId: 56,
      card: 0,
      momentType: 2,
      momentId: 25,
      momentDetails: "從宇宙獲得奇怪的知識",
      desc: "",
      photo:
        "https://res.cloudinary.com/djlffjjc9/image/upload/v1708435035/moment/aps8im2vvhjywaocn6su.png",
      targetDate: "2024-02-20T00:00:00",
      createDate: "2024-02-20T13:17:17.137",
    },
    {
      cardId: 57,
      card: 0,
      momentType: 0,
      momentId: 11,
      momentDetails: "",
      desc: "吃飽睡睡飽吃",
      photo: "",
      targetDate: "2024-02-16T00:00:00",
      createDate: "2024-02-20T13:46:19.04",
    },
    {
      cardId: 70,
      card: 2,
      momentType: 3,
      momentId: 22,
      momentDetails: "",
      desc: "測試",
      photo: null,
      targetDate: "2024-02-23T00:00:00",
      createDate: "2024-02-22T16:38:24.737",
    },
    {
      cardId: 73,
      card: 2,
      momentType: 4,
      momentId: 3,
      momentDetails: "",
      desc: "測試",
      photo: null,
      targetDate: "2024-02-24T00:00:00",
      createDate: "2024-02-23T07:22:41.23",
    },
    {
      cardId: 74,
      card: 2,
      momentType: 0,
      momentId: 7,
      momentDetails: "",
      desc: "",
      photo:
        "https://res.cloudinary.com/djlffjjc9/image/upload/v1708673062/medical/wakqbrmsto20ryxae6r8.png",
      targetDate: "2024-02-28T00:00:00",
      createDate: "2024-02-23T07:24:23.383",
    },
    {
      cardId: 77,
      card: 2,
      momentType: 3,
      momentId: 19,
      momentDetails: "",
      desc: "",
      photo:
        "https://res.cloudinary.com/djlffjjc9/image/upload/v1708795317/medical/oxtefi0ikjejszmo9pv2.webp",
      targetDate: "2024-02-15T00:00:00",
      createDate: "2024-02-24T17:21:58.7",
    },
  ],
};

interface TableBodyProps {
  cardType: RecordCardType;
}

const TableBody: React.FC<TableBodyProps> = ({ cardType }) => {
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
      <div>
        {data.dailyCards.map((event, index) => {
          const {
            targetDate,
            water,
            food,
            urine,
            poo,
            vomit,
            deworming,
            medicine,
            injection,
            rehab,
            remark,
          } = event;

          const weight = () => {
            if (event.weight[0] === "0") {
              return "-";
            } else {
              return event.weight.replace(".", " ");
            }
          };
          const symptom = () => {
            if (event.symptom !== "[]") {
              return JSON.parse(event.symptom).join("、");
            } else {
              return "-";
            }
          };

          return (
            <ul className="flex border-t border-stroke" key={index}>
              <li
                className={`w-[116px] pl-4 pb-3 ${
                  index === 0 ? "pt-6" : "pt-3"
                }`}
              >
                {moment(targetDate).format("YYYY/M/DD")}
              </li>
              {/* 一般 */}
              <ul className="flex gap-x-2 px-4 border-l border-stroke">
                <li
                  className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {weight()}
                </li>
                <li
                  className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {water ? `${water} ml` : "-"}
                </li>
                <div
                  className={`w-[76px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {food !== "[]"
                    ? JSON.parse(food).map((item, index) => (
                        <ul className="flex" key={index}>
                          <li>
                            {item.type} {item.amount} g
                          </li>
                        </ul>
                      ))
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
                  {symptom()}
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
      </div>
    );
  };

  const Medical = () => {
    return (
      <div>
        {data.medicalCards.map((event, index) => {
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
          } = event;

          return (
            <ul className="flex border-t border-stroke" key={index}>
              <div
                className={`w-[116px] pl-4 pb-3 ${
                  index === 0 ? "pt-6" : "pt-3"
                }`}
              >
                {moment(targetDate).format("YYYY/M/DD")}
              </div>
              <ol className="flex gap-x-2 pl-4 border-l border-stroke h-full">
                <li
                  className={`w-[157px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {title}
                </li>
                <li
                  className={`w-[87px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {visitType ? VisitType[visitType] : "-"}
                </li>
                <li
                  className={`w-[119px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {hospital ? hospital : "-"}
                </li>
                <li
                  className={`w-[87px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {doctor ? doctor : "-"}
                </li>
                <li
                  className={`w-[119px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {medicine ? medicine : "-"}
                </li>
                <li
                  className={`w-[191px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {check ? check : "-"}
                </li>
                <li
                  className={`w-[191px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {notice ? notice : "-"}
                </li>
                <li
                  className={`w-[71px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {cost ? cost : "-"}
                </li>
                <li
                  className={`w-[125px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {photo ? (
                    <div className="max-w-[124px] max-h-[93px]">
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
      </div>
    );
  };

  const Moment = () => {
    return (
      <div>
        {data.momentCards.map((event, index) => {
          const { targetDate, momentType, momentId, photo, desc } = event;

          return (
            <ul className="flex border-t border-stroke" key={index}>
              <div
                className={`w-[116px] pl-4 pb-3 ${
                  index === 0 ? "pt-6" : "pt-3"
                }`}
              >
                {moment(targetDate).format("YYYY/M/DD")}
              </div>
              <ol className="flex gap-x-8 pl-4 border-l border-stroke h-full">
                <li
                  className={`w-[88px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {MomentCategoryType[momentType]}
                </li>
                <li
                  className={`w-[158px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {momentId ? MomentIdType[momentId] : "-"}
                </li>
                <li
                  className={`w-[124px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {photo ? (
                    <div className="max-w-[124px] max-h-[93px]">
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
                  className={`w-[344px] pb-3 ${index === 0 ? "pt-6" : "pt-3"}`}
                >
                  {desc ? desc : "-"}
                </li>
              </ol>
            </ul>
          );
        })}
      </div>
    );
  };

  return <div className="text-left">{bodyContent(cardType)}</div>;
};

export default TableBody;
