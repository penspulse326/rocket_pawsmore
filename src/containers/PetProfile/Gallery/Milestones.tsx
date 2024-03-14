import { IconChevronUp } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useState, useContext, memo } from 'react';

import { milestoneList } from '@/common/lib/milestoneList';
import { PetDataContext } from '@/containers/PetProfile';

function Milestones() {
  const { profile } = useContext(PetDataContext)!;
  const species = profile?.petSpecies;

  const Gotten = memo(function GottenComponent() {
    return (
      <div className='hidden w-full flex-wrap gap-4'>
        {milestoneList.map((item) => {
          const { title, content, icon } = item;
          return (
            <div
              className='flex h-full max-h-[150px] w-full max-w-[352px] rounded-[30px] border border-stroke'
              key={title}
            >
              <div className='flex max-w-[168px] items-center justify-center'>
                <Image
                  src={icon}
                  width={168}
                  height={90}
                  alt={title}
                  priority={false}
                  className='h-full w-full'
                />
              </div>
              <ul className='flex h-full w-full max-w-[184px] flex-col justify-center gap-y-1 py-8 pl-2'>
                <li className='text-2xl'>{title}</li>
                <li>{content}</li>
                {/* 取得里程碑的日期 */}
                {/* <li className='text-xs text-note'>{日期}</li> */}
              </ul>
            </div>
          );
        })}
      </div>
    );
  });

  const Yet = memo(function YetComponent() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-1 text-note'>
          <div>未獲得</div>
          <IconChevronUp
            size={24}
            className={`${!isExpanded && 'rotate-180'} duration-300 hover:cursor-pointer`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
        {isExpanded && (
          <div className='flex w-full flex-wrap gap-4'>
            {milestoneList
              .filter((item) => item.species.includes(species!))
              .map((item) => {
                const { title, content, icon } = item;

                return (
                  <div
                    className='flex h-full max-h-[150px] w-full max-w-[352px] rounded-[30px] border border-stroke'
                    key={title}
                  >
                    <div className='flex max-w-[168px] items-center justify-center'>
                      <Image
                        src={icon}
                        className='h-full w-full grayscale'
                        width={168}
                        height={90}
                        alt={title}
                        priority={false}
                      />
                    </div>
                    <ul className='flex w-full max-w-[184px] flex-col justify-center gap-y-1 py-8'>
                      <li className='text-2xl'>{title}</li>
                      <li>{content}</li>
                    </ul>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  });

  return (
    <section className='flex w-full flex-col gap-y-8'>
      <Gotten />
      <Yet />
    </section>
  );
}

export default Milestones;
