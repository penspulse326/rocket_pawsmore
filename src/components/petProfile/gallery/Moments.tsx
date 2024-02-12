import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { IconChevronDown, IconPaw } from "@tabler/icons-react";

import sortByAge from "@/common/helpers/sortByAge";
import getIconColor from "@/common/helpers/getIconColor";
import getCategoryBgcolor from "@/common/helpers/getCategoryBgcolor";
import { originalData, DataType } from "@/common/lib/test/eventData";

const Moments: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterEvent, setFilterEvent] = useState("全部紀錄");

  const EventFilter = () => {
    const category: string[] = ["全部紀錄", "日常紀錄", "醫療紀錄", "重要時刻"];

    return (
      <div
        className="relative flex gap-x-1 justify-between items-center w-[158px] border border-stroke px-4 py-1 rounded-[300px] hover:cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>{filterEvent}</div>
        <IconChevronDown size={24} />
        {isExpanded && (
          <ul className="absolute top-10 left-0.5 bg-white rounded-3xl p-2 w-[124px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
            {category.map((item, index) => {
              return (
                <li
                  className="flex items-center gap-x-1 px-3 py-1 rounded-3xl hover:cursor-pointer hover:bg-secondary"
                  key={index}
                  onClick={() => {
                    setFilterEvent(item);
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {item === "全部類型" ? (
                    ""
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                    >
                      <circle cx="3" cy="3" r="3" fill={getIconColor(item)} />
                    </svg>
                  )}
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };
  const AgeCard = () => {
    const [expandedCard, setExpandedCard] = useState("");

    const handleToggleCard = (id: string) => {
      if (expandedCard === id) {
        setExpandedCard("");
      } else {
        setExpandedCard(id);
      }
    };

    const sortedData =
      filterEvent === "全部紀錄"
        ? sortByAge(originalData)
        : sortByAge(originalData.filter((event) => event.card === filterEvent));

    const MomentCard: React.FC<{ data: DataType }> = (props) => {
      if (!props) {
        return null;
      }
      const { data } = props;
      const { category, content, photo, desc } = data;

      interface MomentDataType {
        TITLE: string;
        content: JSX.Element | null;
      }

      const momentData: MomentDataType[] = [
        {
          TITLE: "事件分類",
          content: (
            <li
              className={`px-2 rounded-[30px] ${getCategoryBgcolor(category!)}`}
            >
              {category}
            </li>
          ),
        },
        { TITLE: "內容", content: <li>{content}</li> },
        {
          TITLE: "紀錄照片",
          content: photo ? (
            <Image
              className="rounded-[10px] object-cover"
              src={photo}
              width={248}
              height={168}
              alt="moment photo"
            />
          ) : null,
        },
        { TITLE: "事件描述", content: desc ? <li>{desc}</li> : null },
      ];

      return (
        <ul className="flex flex-col gap-y-3">
          {momentData.map((moment, index) => {
            return (
              <ol key={index} className="flex gap-x-12">
                <li className="font-semibold min-w-[64px]">{moment.TITLE}</li>
                {moment.content}
              </ol>
            );
          })}
        </ul>
      );
    };

    const MedicalCard: React.FC<{ data: DataType }> = (props) => {
      if (!props) {
        return null;
      }
      const { data } = props;
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

      interface MedicalDataType {
        TITLE: string;
        content: JSX.Element | null;
      }

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
        const [isOpened, setIsOpened] = useState(false);
        return (
          <div className="flex flex-col gap-y-2 w-full">
            {/* TITLE */}
            <div className="font-semibold min-w-[96px]">相關日常紀錄</div>
            {/* content container */}
            <button
              className="flex flex-col border border-stroke rounded-[30px] px-6 py-4"
              type="button"
              onClick={() => setIsOpened(!isOpened)}
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
                  className={`${!isOpened && "rotate-180"} duration-300`}
                />
              </ul>
              {/* card content */}
              {isOpened && <></>}
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
                  <li className="font-semibold min-w-[96px] self-start">
                    {item.TITLE}
                  </li>
                  {item.content}
                </ol>
              );
            })}
          {related_id && <RelatedCard />}
        </ul>
      );
    };

    return (
      <div className="flex flex-col gap-y-16">
        {sortedData.map((ageGroup, index) => {
          const ageInYear = Math.floor(ageGroup.ageInMonth / 12);
          const ageInMonth = ageGroup.ageInMonth % 12;

          return (
            <div className="flex flex-col gap-y-1" key={index}>
              {/* age */}
              <ul className="flex gap-x-2 text-xl font-medium">
                <ol className="flex gap-x-1">
                  <li className="w-[30px] text-center">{ageInYear}</li>
                  <li>歲</li>
                </ol>
                <ol className="flex gap-x-1">
                  <li className="w-[30px] text-center">{ageInMonth}</li>
                  <li>個月</li>
                </ol>
              </ul>
              <div className="ml-14 flex flex-col">
                <div className="h-8 border-l-2 border-stroker ml-3"></div>
                <div className="flex gap-x-4">
                  <div className="flex flex-col gap-y-8 w-full">
                    {ageGroup.events.map((dateGroup, index) => {
                      return (
                        <div className="flex gap-x-4" key={index}>
                          {/* date */}
                          <ul className="flex gap-x-2">
                            <li className="">
                              <div className="h-4 border-l-2 border-stroker ml-3"></div>
                              <IconPaw color={"#203170"} fill={"#203170"} />
                              {index === ageGroup.events.length - 1 || (
                                <div className="h-full border-l-2 border-stroker ml-3"></div>
                              )}
                            </li>
                            <li className="w-[84px] h-10 flex items-end">
                              {moment(dateGroup.date).format("YYYY/M/D")}
                            </li>
                          </ul>
                          {/* card container */}
                          <div className="flex flex-col gap-y-4 max-w-[472px] w-full">
                            {dateGroup.events.map((event, index) => {
                              const cardId = `${index}-${event.target_date}-${event.card}`;
                              const isExpanded = expandedCard === cardId;

                              return (
                                // single card
                                <div
                                  className="flex flex-col gap-y-6 border border-stroke rounded-[30px] px-6 py-4"
                                  key={index}
                                  id={cardId}
                                >
                                  {/* title */}
                                  <div className="flex justify-between">
                                    <div className="flex gap-x-1 items-center">
                                      {event.card === "醫療紀錄" &&
                                      event.type === "醫療提醒" ? (
                                        <Image
                                          src="/test/icon-exclamation.svg"
                                          width={6}
                                          height={24}
                                          alt="exclamation mark"
                                        />
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="6"
                                          height="6"
                                          viewBox="0 0 6 6"
                                          fill="none"
                                        >
                                          <circle
                                            cx="3"
                                            cy="3"
                                            r="3"
                                            fill={getIconColor(event.card)}
                                          />
                                        </svg>
                                      )}
                                      {event.type === "醫療提醒"
                                        ? event.reserve_type
                                        : event.card}
                                    </div>
                                    <IconChevronDown
                                      size={24}
                                      color={"#808080"}
                                      className={`${
                                        isExpanded && "rotate-180"
                                      } duration-300 hover:cursor-pointer`}
                                      onClick={() => handleToggleCard(cardId)}
                                    />
                                  </div>
                                  {/* content */}
                                  {isExpanded &&
                                    (() => {
                                      switch (event.card) {
                                        case "重要時刻":
                                          return <MomentCard data={event} />;
                                        case "醫療紀錄":
                                          return <MedicalCard data={event} />;
                                        default:
                                          return null;
                                      }
                                    })()}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <section className="flex flex-col max-w-[1088px] w-full">
      <div
        className="flex justify-end"
        tabIndex={0}
        onBlur={() => setIsExpanded(false)}
      >
        <EventFilter />
      </div>
      <div className="max-w-[660px] w-full mx-auto">
        <AgeCard />
      </div>
    </section>
  );
};

export default Moments;
