import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { IconChevronDown, IconPaw } from "@tabler/icons-react";

import sortByAge from "@/common/helpers/sortByAge";
import getIconColor from "@/common/helpers/getIconColor";
import { originalData } from "@/common/lib/test/eventData";

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

    let sortedData;

    if (filterEvent === "全部紀錄") {
      sortedData = sortByAge(originalData);
    } else {
      const filteredData = originalData.filter(
        (event) => event.card === filterEvent
      );
      sortedData = sortByAge(filteredData);
    }

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
                                  className="border border-stroke rounded-[30px] px-6 py-4 hover:cursor-pointer"
                                  key={index}
                                  id={cardId}
                                  onClick={() => handleToggleCard(cardId)}
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
                                    />
                                  </div>
                                  {/* content */}
                                  {isExpanded && <>{event.target_date}</>}
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
