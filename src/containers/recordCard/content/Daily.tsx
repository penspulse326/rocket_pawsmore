import React from "react";
import ToggleList from "../card/ToggleList";

import { CardUnionDataType, DailyCardDataType } from "@/types";
import { UrineType, PooType, VomitType } from "@/types/enums";

interface DailyDataType {
  TITLE: string;
  content: JSX.Element | null;
}

interface DataArrayType {
  TITLE: string;
  content: string | number;
}

interface DailyProps {
  data: CardUnionDataType;
}

const Daily: React.FC<DailyProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    weight,
    food,
    water,
    urine,
    poo,
    vomit,
    symptom,
    deworming,
    medicine,
    injection,
    rehab,
    remark,
  } = data as DailyCardDataType;

  const hasRoutineRecord: boolean =
    (weight && weight.slice(0, 1) !== "0") || food !== "[]" || water !== 0;

  const isAbnormal: boolean =
    urine !== 0 || poo !== 0 || vomit !== 0 || symptom !== "[]";

  const hasDailyCares: boolean =
    deworming !== "" || medicine !== "" || injection !== "" || rehab !== "";

  const Routine: React.FC = () => {
    const weightFormat = (weight: string) => {
      const separate = weight.split(".");
      const value = separate[0];
      const unit = separate[1];

      return { value, unit };
    };

    const routineData: DailyDataType[] = [
      {
        TITLE: "體重",
        content:
          Number(weightFormat(weight).value) !== 0 ? (
            <>
              <li>{weightFormat(weight).value}</li>
              <li>{weightFormat(weight).unit}</li>
            </>
          ) : null,
      },
      {
        TITLE: "飲水量",
        content: water ? (
          <>
            <li>{water}</li>
            <li>ml</li>
          </>
        ) : null,
      },
      {
        TITLE: "進食量",
        content:
          food !== "[]" ? (
            <div className="flex flex-col">
              {JSON.parse(food).map(
                (item: { type: string; amount: number }, index: number) => {
                  const { type, amount } = item;
                  return (
                    <ul key={index} className="flex gap-x-1">
                      <li>{type}</li>
                      <li>{amount}</li>
                      <li>g</li>
                    </ul>
                  );
                }
              )}
            </div>
          ) : null,
      },
    ];
    return (
      routineData && (
        <ToggleList title={"一般"}>
          <div className="flex flex-col gap-y-2">
            {routineData
              .filter((data) => data.content)
              .map((item, index) => {
                return (
                  <ul
                    key={index}
                    className="flex items-center gap-x-4 max-h-[72px]"
                  >
                    <li className="font-semibold min-w-12 self-start">
                      {item.TITLE}
                    </li>
                    <ol className="flex gap-x-1">{item.content}</ol>
                  </ul>
                );
              })}
          </div>
        </ToggleList>
      )
    );
  };

  const abnormal: DataArrayType[] = [
    { TITLE: "尿液", content: UrineType[urine] },
    { TITLE: "糞便", content: PooType[poo] },
    { TITLE: "嘔吐", content: VomitType[vomit] },
    { TITLE: "症狀", content: symptom !== "[]" && JSON.parse(symptom) },
  ];

  const dailyCares: DataArrayType[] = [
    { TITLE: "驅蟲", content: deworming },
    { TITLE: "用藥", content: medicine },
    { TITLE: "注射", content: injection },
    { TITLE: "復健", content: rehab },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      {hasRoutineRecord && <Routine />}
      {/* the abnormals */}
      {isAbnormal && (
        <ToggleList title={"異常"}>
          <div className="flex flex-col gap-y-2">
            {abnormal
              .filter((item) => item.content)
              .map((item, index) => {
                const { TITLE, content } = item;
                return (
                  <ul key={index} className="flex items-center gap-x-4 ">
                    <li className="font-semibold min-w-12 self-start">
                      {TITLE}
                    </li>
                    <li>
                      {TITLE === "症狀" && Array.isArray(content)
                        ? content.join("、")
                        : content}
                    </li>
                  </ul>
                );
              })}
          </div>
        </ToggleList>
      )}
      {/* daily cares */}
      {hasDailyCares && (
        <ToggleList title={"日常照護"}>
          <div className="flex flex-col gap-y-2">
            {dailyCares
              .filter((item) => item.content)
              .map((item, index) => {
                const { TITLE, content } = item;
                return (
                  <ul key={index} className="flex gap-x-4 items-center h-8">
                    <li className="font-semibold min-w-12">{TITLE}</li>
                    <li>{content}</li>
                  </ul>
                );
              })}
          </div>
        </ToggleList>
      )}
      {/* note */}
      <ul className="flex flex-col gap-y-2">
        <li className="text-note">備註</li>
        <li>{remark}</li>
      </ul>
    </div>
  );
};

export default Daily;
