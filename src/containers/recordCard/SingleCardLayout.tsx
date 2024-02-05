import React, { createContext, useMemo } from "react";
import moment from "moment";
import { IconChevronUp, IconEdit } from "@tabler/icons-react";
import { DataType } from "@/common/lib/test/eventData";
import Title from "./card/Title";
import ShareBtn from "./card/ShareBtn";
import Moment from "./content/Moment";
import Medical from "./content/Medical";
import Daily from "./content/Daily";

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
          {/* icons */}
          <div className="flex gap-x-2">
            {isOpened && (
              <IconEdit
                size={24}
                color={"#203170"}
                className="hover:cursor-pointer"
              />
            )}
            <IconChevronUp
              size={24}
              color={"#808080"}
              className={`${
                !isOpened && "rotate-180"
              } duration-300 hover:cursor-pointer`}
              onClick={() => onToggle(id)}
            />
          </div>
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
