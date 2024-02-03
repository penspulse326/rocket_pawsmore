import React, { useState, useContext } from "react";
import moment from "moment";
import Image from "next/image";
import {
  IconChevronUp,
  IconChevronDown,
  IconEdit,
  IconShare2,
} from "@tabler/icons-react";
import { DateContext } from "@/pages/record_dashboard";
import { originalData, DataType } from "@/common/lib/test/eventData";
import sortData from "@/common/helpers/sortData";

interface ToggleListPropsType {
  title: string;
  children?: React.ReactNode;
}

const ToggleList: React.FC<ToggleListPropsType> = ({ children, title }) => {
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="pb-4 border-b flex flex-col gap-y-2">
      {/* 最外層加上標題與內容間的間距 */}
      <div className="flex items-center gap-2 text-note">
        {title}
        <button type="button" onClick={() => setIsListOpen(!isListOpen)}>
          <IconChevronUp
            size={24}
            stroke={2}
            className={`${!isListOpen && "rotate-180"} duration-100`}
          />
        </button>
      </div>
      <div className={`${!isListOpen && "hidden"}`}>{children}</div>
    </div>
  );
};

// single card

interface SingleCardPropsType {
  data: DataType;
}

const Cards: React.FC = () => {
  const { selectedDate } = useContext(DateContext);
  const sortedData = sortData();

  const SingleCard: React.FC<SingleCardPropsType> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const Title: React.FC = () => {
      const isReminder: boolean =
        data.card === "醫療紀錄" && data.type === "醫療提醒";

      return (
        <div className="flex gap-x-4 items-center h-9">
          {isReminder ? (
            <Image
              src="/test/icon-exclamation.svg"
              width={9}
              height={36}
              alt="exclamation symbol"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle
                cx="3"
                cy="3"
                r="3"
                fill={(() => {
                  switch (data.card) {
                    case "日常紀錄":
                      return "#969AFF";
                    case "醫療紀錄":
                      return "#FF6D80";
                    case "重要時刻":
                      return "#FFA959";
                    default:
                      return "";
                  }
                })()}
              />
            </svg>
          )}
          <span className="text-2xl font-bold">
            {isReminder ? data.reserve_type : data.card}
          </span>
        </div>
      );
    };

    const Content: React.FC = () => {
      const Reminder: React.FC = () => {
        return (
          <>
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
            <Share />
          </>
        );
      };
      const Moment: React.FC = () => {
        const tagBackgroundColor = (category: string) => {
          switch (category) {
            case "行為表現":
              return "bg-[#F9E6FF]";
            case "驚喜":
              return "bg-[#FFF5CF]";
            case "生活習慣":
              return "bg-[#FFE9EC]";
            case "社交":
              return "bg-[#D5F0FF]";
            case "技能":
              return "bg-[#E0FFDF]";
            default:
              return "";
          }
        };
        return (
          <>
            <ul className="flex flex-col gap-y-3">
              <ol className="flex gap-x-12">
                <li className="font-semibold min-w-[64px]">事件分類</li>
                <li>
                  {data.category && (
                    <span
                      className={`px-2 rounded-[30px] ${tagBackgroundColor(
                        data.category
                      )}`}
                    >
                      {data.category}
                    </span>
                  )}
                </li>
              </ol>
              <ol className="flex gap-x-12">
                <li className="font-semibold min-w-[64px]">內容</li>
                <li>{data.content}</li>
              </ol>
              <ol className="flex gap-x-12">
                <li className="font-semibold min-w-[64px]">紀錄照片</li>
                <Image
                  className="rounded-[10px]"
                  src={data.photo!}
                  width={248}
                  height={168}
                  alt="moment photo"
                />
              </ol>
              <ol className="flex gap-x-12">
                <li className="font-semibold min-w-[64px]">事件描述</li>
                <li>{data.desc}</li>
              </ol>
            </ul>
            <Share />
          </>
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
          <>
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
                            <li className="font-semibold min-w-12">
                              {item.title}
                            </li>
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
                            <li className="font-semibold min-w-12">
                              {item.title}
                            </li>
                            <li>
                              {item.title === "症狀" &&
                              Array.isArray(item.content)
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
                            <li className="font-semibold min-w-12">
                              {item.title}
                            </li>
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
            <Share />
          </>
        );
      };
      const Medical: React.FC = () => {
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
          <>
            <div className="flex flex-col gap-y-4">
              <ul className="flex flex-col gap-y-2">
                {medicalData
                  .filter((item) => item.content)
                  .map((item, index) => {
                    return (
                      <ol key={index} className="flex gap-x-6">
                        <li className="font-semibold min-w-[96px]">
                          {item.title}
                        </li>
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
            <Share />
          </>
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

    const Share: React.FC = () => {
      return (
        <div className="flex gap-x-1 text-primary justify-center hover:cursor-pointer">
          <IconShare2 size={24} color={"#203170"} />
          分享到社群
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-y-6 border border-stroke rounded-[30px] px-6 py-4">
        {/* title */}
        <div className="flex justify-between items-center">
          <Title />
          {isExpanded ? (
            <div className="flex gap-x-2">
              <IconEdit
                size={24}
                color={"#203170"}
                className="hover:cursor-pointer"
                onClick={() => console.log("edit")}
              />
              <IconChevronUp
                size={24}
                color={"#808080"}
                className="hover:cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          ) : (
            <IconChevronDown
              size={24}
              color={"#808080"}
              className="hover:cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
        {/* content */}
        {isExpanded && <Content />}
      </div>
    );
  };

  return (
    <>
      {sortedData
        .filter(
          (data) =>
            (data.created_at === selectedDate && data.type !== "醫療提醒") ||
            data.reserve_at === selectedDate
        )
        .map((data, index) => (
          <SingleCard key={index} data={data} />
        ))}
    </>
  );
};

export default Cards;