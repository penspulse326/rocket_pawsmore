import { IconPaw, IconChevronDown } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';

import getIconColor from '@/common/helpers/getIconColor';
import { SortedDataType } from '@/common/helpers/sortByAge';
import Daily from '@/containers/recordCard/content/Daily';
import Medical from '@/containers/recordCard/content/Medical';
import Moment from '@/containers/recordCard/content/Moment';
import Reminder from '@/containers/recordCard/content/Reminder';
import { MedicalCardDataType, MomentCardDataType } from '@/common/types';
import { RecordCardType, MedicalCardType, ReserveType, MomentIdType } from '@/common/types/enums';

interface PropsType {
  sortedData: SortedDataType[];
}

function AgeCard({ sortedData }: PropsType) {
  const [expandedCard, setExpandedCard] = useState('');

  const handleToggleCard = (prop: string) => {
    if (expandedCard === prop) {
      setExpandedCard('');
    } else {
      setExpandedCard(prop);
    }
  };

  return (
    <div className='flex flex-col gap-y-16'>
      {sortedData.map((ageGroup) => {
        const ageInYear = Math.floor(ageGroup.ageInMonth / 12);
        const ageInMonth = ageGroup.ageInMonth % 12;

        return (
          <div className='flex flex-col gap-y-1' key={ageGroup.ageInMonth}>
            {/* age */}
            <ul className='flex gap-x-2 text-xl font-medium'>
              <ol className='flex gap-x-1'>
                <li className='w-[30px] text-center'>{ageInYear}</li>
                <li>歲</li>
              </ol>
              <ol className='flex gap-x-1'>
                <li className='w-[30px] text-center'>{ageInMonth}</li>
                <li>個月</li>
              </ol>
            </ul>
            <div className='ml-14 flex flex-col'>
              <div className='border-stroker ml-3 h-8 border-l-2' />
              <div className='flex gap-x-4'>
                <div className='flex w-full flex-col gap-y-8'>
                  {ageGroup.events.map((dateGroup, ageIndex) => {
                    return (
                      <div className='flex gap-x-4' key={dateGroup.date}>
                        {/* date */}
                        <ul className='flex gap-x-2'>
                          <li className=''>
                            <div className='border-stroker ml-3 h-4 border-l-2' />
                            <IconPaw color='#203170' fill='#203170' />
                            {ageIndex === ageGroup.events.length - 1 || (
                              <div className='border-stroker ml-3 h-full border-l-2' />
                            )}
                          </li>
                          <li className='flex h-10 w-[84px] items-end'>
                            {moment(dateGroup.date).format('YYYY/M/D')}
                          </li>
                        </ul>
                        {/* card container */}
                        <div className='flex w-full max-w-[472px] flex-col gap-y-4'>
                          {dateGroup.events.map((event, dateIndex) => {
                            const { card, targetDate } = event;
                            const { cardType, reserveType, reserveDate } =
                              event as MedicalCardDataType;

                            // 產生用於 index 的卡片 key
                            const cardIndex = () => {
                              if (cardType === MedicalCardType.醫療提醒) {
                                return `${moment(reserveDate).format('YYYYMMDD')}${dateIndex}`;
                              }
                              return `${moment(targetDate).format('YYYYMMDD')}${dateIndex}`;
                            };

                            const isExpanded: boolean = expandedCard === cardIndex();

                            // 卡片標題邏輯
                            const titleText = () => {
                              const isReminder: boolean =
                                card === RecordCardType.醫療紀錄 &&
                                cardType === MedicalCardType.醫療提醒;

                              const { title } = event as MedicalCardDataType;
                              const { momentType, momentId } = event as MomentCardDataType;

                              if (isReminder) {
                                return ReserveType[reserveType];
                              }
                              if (card === RecordCardType.重要時刻) {
                                if (momentType !== 2) {
                                  return MomentIdType[momentId];
                                }
                                return '新技能';
                              }
                              if (card === RecordCardType.醫療紀錄) {
                                return title;
                              }
                              return RecordCardType[card];
                            };

                            // 卡片內容邏輯
                            const cardContent = () => {
                              if (cardType === MedicalCardType.醫療提醒) {
                                return <Reminder data={event} />;
                              }
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
                            };

                            return (
                              // single card
                              <div
                                className={`flex flex-col gap-y-6 rounded-[30px] border border-stroke px-6 pt-4 ${
                                  isExpanded ? 'pb-6' : 'pb-4'
                                }`}
                                key={cardIndex()}
                              >
                                {/* title */}
                                <div className='flex justify-between'>
                                  <div className='flex items-center gap-x-1 font-bold'>
                                    {card === RecordCardType.醫療紀錄 &&
                                    cardType === MedicalCardType.醫療提醒 ? (
                                      <Image
                                        src='/test/icon-exclamation.svg'
                                        width={6}
                                        height={24}
                                        alt='exclamation mark'
                                      />
                                    ) : (
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='6'
                                        height='6'
                                        viewBox='0 0 6 6'
                                        fill='none'
                                      >
                                        <circle
                                          cx='3'
                                          cy='3'
                                          r='3'
                                          fill={getIconColor(RecordCardType[card])}
                                        />
                                      </svg>
                                    )}
                                    {titleText()}
                                  </div>
                                  <IconChevronDown
                                    size={24}
                                    color='#808080'
                                    className={`${
                                      isExpanded && 'rotate-180'
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
}

export default AgeCard;
