import React, { useState, useContext } from "react";
import Image from "next/image";
import { IconChevronUp } from "@tabler/icons-react";

import { PetDataContext } from "@/pages/pet/[petAccount]";
import { milestoneList } from "@/common/lib/milestoneList";

const Milestones: React.FC = () => {
  const { profile } = useContext(PetDataContext)!;
  const species = profile?.petSpecies;

  const Gotten: React.FC = () => {
    return (
      <div className="flex flex-wrap gap-4 w-full">
        {/* {milestoneList.map((item, index) => {
          return (
            <div
              className="flex border border-stroke rounded-[30px] max-w-[352px] max-h-[150px] w-full h-full"
              key={index}
            >
              <div className="flex justify-center items-center max-w-[168px] w-full">
                <Image
                  src={item.icon}
                  width={168}
                  height={90}
                  alt="milestone badge"
                />
              </div>
              <ul className="flex flex-col justify-center gap-y-1 max-w-[184px] w-full h-full pl-2 py-8">
                <li className="text-2xl">{item.title}</li>
                <li>{item.content}</li>
                <li className="text-xs text-note">{item.created_at}</li>
              </ul>
            </div>
          );
        })} */}
      </div>
    );
  };

  const Yet: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-1 text-note">
          <div>未獲得</div>
          <IconChevronUp
            size={24}
            className={`${
              !isExpanded && "rotate-180"
            } duration-300 hover:cursor-pointer`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
        {isExpanded && (
          <div className="flex flex-wrap gap-4 w-full">
            {milestoneList
              .filter((item) => item.species.includes(species!))
              .map((item, index) => (
                <div
                  className="flex border border-stroke rounded-[30px] max-w-[352px] max-h-[150px] w-full h-full"
                  key={index}
                >
                  <div className="flex justify-center items-center max-w-[168px] w-full">
                    <Image
                      src={item.icon}
                      className="grayscale"
                      width={168}
                      height={90}
                      alt="milestone badge"
                    />
                  </div>
                  <ul className="flex flex-col justify-center gap-y-1 max-w-[184px] w-full py-8">
                    <li className="text-2xl">{item.title}</li>
                    <li>{item.content}</li>
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-y-8 w-full">
      {/* <Gotten /> */}
      <Yet />
    </section>
  );
};

export default Milestones;
