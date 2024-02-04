import React, { createContext, useMemo } from "react";
import moment from "moment";
import { IconChevronUp, IconChevronDown, IconEdit } from "@tabler/icons-react";
import { DataType } from "@/common/lib/test/eventData";
import ToggleList from "./card/ToggleList";
import Title from "./card/Title";
import ShareBtn from "./card/ShareBtn";
import Moment from "./content/Moment";
import Medical from "./content/Medical";

export const DataContext = createContext<DataType | undefined>(undefined);

interface DataContextProviderProps {
  children: React.ReactNode;
  data: DataType;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  data,
}) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

interface SingleCardPropsType {
  data: DataType;
  id: number;
  isOpened: boolean;
  onToggle: (id: number) => void;
}

const SingleCardLayout: React.FC<SingleCardPropsType> = ({
  data,
  id,
  isOpened,
  onToggle,
}) => {
  const getData = useMemo(() => data, [data]);

  const Content: React.FC = () => {
    const Reminder: React.FC = () => {
      return (
        <ul className="flex flex-col gap-y-2">
          <ol className="flex gap-x-8">
            <li className="font-semibold">預約類型</li>
            <li>{data.reserve_type}</li>
          </ol>
          <ol className="flex gap-x-8">
            <li className="font-semibold">預約時間</li>
            <li>{moment(data.reserve_at).format("YYYY/M/D HH:MM")}</li>
          </ol>
        </ul>
      );
    };
    const Daily: React.FC = () => {
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

    if (data.type === "醫療提醒") {
      return <Reminder />;
    } else {
      switch (data.card) {
        case "醫療紀錄":
          return <Medical />;
        case "重要時刻":
          return <Moment />;
        case "日常紀錄":
          return <Daily />;
        default:
          return null;
      }
    }
  };

  return (
    <DataContext.Provider value={getData}>
      <div className="flex flex-col gap-y-6 border border-stroke rounded-[30px] px-6 py-4">
        {/* title */}
        <div className="flex justify-between items-center">
          <Title />
          {isOpened ? (
            <div className="flex gap-x-2">
              <IconEdit
                size={24}
                color={"#203170"}
                className="hover:cursor-pointer"
              />
              <IconChevronUp
                size={24}
                color={"#808080"}
                className="hover:cursor-pointer"
                onClick={() => onToggle(id)}
              />
            </div>
          ) : (
            <IconChevronDown
              size={24}
              color={"#808080"}
              className="hover:cursor-pointer"
              onClick={() => onToggle(id)}
            />
          )}
        </div>
        {/* content */}
        {isOpened && (
          <>
            <Content />
            <ShareBtn />
          </>
        )}
      </div>
    </DataContext.Provider>
  );
};

export default SingleCardLayout;
