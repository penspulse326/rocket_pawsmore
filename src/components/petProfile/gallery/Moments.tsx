import React, { useState, useContext } from "react";
import Image from "next/image";
import moment from "moment";
import { IconChevronDown, IconPaw } from "@tabler/icons-react";

import Daily from "@/containers/recordCard/content/Daily";
import Medical from "@/containers/recordCard/content/Medical";
import Moment from "@/containers/recordCard/content/Moment";
import Reminder from "@/containers/recordCard/content/Reminder";
import NoContent from "@/components/NoContent";

import sortByAge from "@/common/helpers/sortByAge";
import getIconColor from "@/common/helpers/getIconColor";

import { PetDataContext } from "@/pages/pet/[petAccount]";
import { MedicalCardDataType, MomentCardDataType } from "@/types";
import {
  RecordCardType,
  MedicalCardType,
  ReserveType,
  MomentIdType,
} from "@/types/enums";

const Moments: React.FC = () => {
  const { record, profile } = useContext(PetDataContext)!;

  const [isExpanded, setIsExpanded] = useState(false);
  const [filterEvent, setFilterEvent] = useState("全部紀錄");

  if (!record || !profile) {
    return null;
  }
  const data = record;
  const birthday: string = moment(profile.birthday).format("YYYY-MM-DD");

  const sortedData =
    filterEvent === "全部紀錄"
      ? sortByAge(data, birthday)
      : sortByAge(
          data.filter((event) => RecordCardType[event.card] === filterEvent),
          birthday
        );

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
    const handleToggleCard = (prop: string) => {
      if (expandedCard === prop) {
        setExpandedCard("");
      } else {
        setExpandedCard(prop);
      }
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
                              const { card, targetDate } = event;
                              const { cardType, reserveType, reserveDate } =
                                event as MedicalCardDataType;

                              const cardIndex = () => {
                                if (cardType === MedicalCardType.醫療提醒) {
                                  return `${moment(reserveDate).format(
                                    "YYYYMMDD"
                                  )}${index}`;
                                } else {
                                  return `${moment(targetDate).format(
                                    "YYYYMMDD"
                                  )}${index}`;
                                }
                              };

                              const isExpanded = expandedCard === cardIndex();

                              const titleText = () => {
                                const isReminder: boolean =
                                  card === RecordCardType.醫療紀錄 &&
                                  cardType === MedicalCardType.醫療提醒;

                                const title = (event as MedicalCardDataType)
                                  .title;
                                const { momentType, momentId } =
                                  event as MomentCardDataType;

                                if (isReminder) {
                                  return ReserveType[reserveType];
                                } else if (card === RecordCardType.重要時刻) {
                                  if (momentType !== 2) {
                                    return MomentIdType[momentId];
                                  } else {
                                    return "新技能";
                                  }
                                } else if (card === RecordCardType.醫療紀錄) {
                                  return title;
                                } else {
                                  return RecordCardType[card];
                                }
                              };

                              const cardContent = () => {
                                const visitType = (event as MedicalCardDataType)
                                  .visitType;

                                if (MedicalCardType[visitType] === "醫療提醒") {
                                  return <Reminder data={event} />;
                                } else {
                                  switch (card) {
                                    case RecordCardType.重要時刻:
                                      return <Moment data={event} />;
                                    case RecordCardType.醫療紀錄:
                                      return <Medical data={event} />;
                                    case RecordCardType.日常紀錄:
                                      return <Daily data={event} />;
                                    default:
                                      return null;
                                  }
                                }
                              };

                              return (
                                // single card
                                <div
                                  className={`flex flex-col gap-y-6 border border-stroke rounded-[30px] px-6 pt-4 ${
                                    isExpanded ? "pb-6" : "pb-4"
                                  }`}
                                  key={index}
                                >
                                  {/* title */}
                                  <div className="flex justify-between">
                                    <div className="flex gap-x-1 items-center font-bold">
                                      {card === RecordCardType.醫療紀錄 &&
                                      cardType === MedicalCardType.醫療提醒 ? (
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
                                            fill={getIconColor(
                                              RecordCardType[card]
                                            )}
                                          />
                                        </svg>
                                      )}
                                      {titleText()}
                                    </div>
                                    <IconChevronDown
                                      size={24}
                                      color={"#808080"}
                                      className={`${
                                        isExpanded && "rotate-180"
                                      } duration-300 hover:cursor-pointer`}
                                      onClick={() => {
                                        handleToggleCard(cardIndex());
                                      }}
                                    />
                                  </div>
                                  {/* content */}
                                  {isExpanded && cardContent()}
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
        {Array.isArray(record) && record.length > 0 ? (
          <AgeCard />
        ) : (
          <NoContent />
        )}
      </div>
    </section>
  );
};

export default Moments;
