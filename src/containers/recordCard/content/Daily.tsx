import React, { useContext } from "react";
import ToggleList from "../card/ToggleList";
import { DataContext } from "../SingleCardLayout";

const Daily: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }

  const hasRoutineRecord: boolean =
    data.weight !== undefined ||
    data.food !== undefined ||
    data.water !== undefined;

  const routineRecord: DataArrayType[] = [
    { title: "體重", content: data.weight },
    { title: "飲水量", content: data.water },
  ];

  const isAbnormal: boolean =
    data.urine !== undefined ||
    data.stool !== undefined ||
    data.vomit !== undefined ||
    data.symptom !== undefined;

  const abnormal: DataArrayType[] = [
    { title: "尿液", content: data.urine },
    { title: "糞便", content: data.stool },
    { title: "嘔吐", content: data.vomit },
    { title: "症狀", content: data.symptom },
  ];

  const hasDailyCares: boolean =
    data.deworming !== undefined ||
    data.medicine !== undefined ||
    data.injection !== undefined ||
    data.rehab !== undefined;

  interface DataArrayType {
    title: string;
    content: string | number | undefined | null | string[];
  }

  const dailyCares: DataArrayType[] = [
    { title: "驅蟲", content: data.deworming },
    { title: "用藥", content: data.medicine },
    { title: "注射", content: data.injection },
    { title: "復健", content: data.rehab },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      {/* routine record */}
      {hasRoutineRecord && (
        <ToggleList title={"一般"}>
          <div className="flex flex-col gap-y-2">
            {routineRecord
              .filter((item) => item.content)
              .map((item, index) => {
                return (
                  <ul key={index} className="flex gap-x-4">
                    <li className="font-semibold min-w-12">{item.title}</li>
                    <ol className="flex gap-x-1">
                      <li>{item.content} </li>
                      <li>{item.title === "飲水量" ? "ml" : "kg"}</li>
                    </ol>
                  </ul>
                );
              })}
            {/* food intakes */}
            {data.food && (
              <div className="flex gap-x-4">
                <div className="font-semibold min-w-12">進食量</div>
                <div className="flex flex-col">
                  {data.food.map((item, index) => {
                    return (
                      <ul key={index} className="flex gap-x-1">
                        <li>{item.food_type}</li>
                        <li>{item.food_weight}</li>
                        <li>g</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ToggleList>
      )}
      {/* the abnormals */}
      {isAbnormal && (
        <ToggleList title={"異常"}>
          <div className="flex flex-col gap-y-2">
            {abnormal
              .filter((item) => item.content)
              .map((item, index) => {
                return (
                  <ul key={index} className="flex gap-x-4">
                    <li className="font-semibold min-w-12">{item.title}</li>
                    <li>
                      {item.title === "症狀" && Array.isArray(item.content)
                        ? item.content.join("、")
                        : item.content}
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
                return (
                  <ul key={index} className="flex gap-x-4">
                    <li className="font-semibold min-w-12">{item.title}</li>
                    <li>{item.content}</li>
                  </ul>
                );
              })}
          </div>
        </ToggleList>
      )}
      {/* note */}
      {data.remark && (
        <ul className="flex flex-col gap-y-2">
          <li className="text-note">備註</li>
          <li>{data.remark}</li>
        </ul>
      )}
    </div>
  );
};

export default Daily;
