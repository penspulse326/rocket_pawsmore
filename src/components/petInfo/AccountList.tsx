import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/common/redux/store";

import type { PetDataType } from "@/types";

interface PropsType {
  setId?: React.Dispatch<React.SetStateAction<number | null>>;
}

const AccountList: React.FC<PropsType> = ({ setId }) => {
  const petList = useSelector((state: RootState) => state.petList);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDataType>(petList[0]);

  useEffect(() => {
    setId(selectedPet.petId);
  }, [selectedPet]);

  const AccountCard = () => {
    return (
      <div className="flex gap-x-2 items-center border border-stroke rounded-[60px] p-2 hover:cursor-pointer">
        <Image
          src={selectedPet.petPhoto || "/images/default-photo.png"}
          width={48}
          height={48}
          className="rounded-full"
          alt={selectedPet.petAccount}
        />
        <div className="flex grow justify-between items-center">
          <ul>
            <li>{selectedPet.petName}</li>
            <li className="text-note">@{selectedPet.petAccount}</li>
          </ul>
          {isExpanded ? (
            <IconChevronDown size={24} className="mr-2" />
          ) : (
            <IconChevronUp size={24} className="mr-2" />
          )}
        </div>
      </div>
    );
  };
  const ExpandedCard = () => {
    return (
      <div className="absolute top-[76px] z-10 p-2 w-full bg-white shadow-custom rounded-[30px]">
        {petList.map(({ petAccount, petName, petPhoto, petId }, index) => {
          return (
            <ul
              className="flex gap-x-2 items-center rounded-[60px] p-2 hover:bg-secondary hover:cursor-pointer"
              onClick={() => {
                setSelectedPet(petList[index]);
                setIsExpanded(false);
                setId(petId);
              }}
              key={`${index}-${petAccount}`}
            >
              <Image
                src={petPhoto || "/images/default-photo.png"}
                width={48}
                height={48}
                className="rounded-full"
                alt="pet avatar"
              />
              <ol className="mr-2 truncate">
                <li>{petName}</li>
                <li className="text-note">@{petAccount}</li>
              </ol>
            </ul>
          );
        })}
      </div>
    );
  };
  return (
    <section
      className="relative max-w-[250px] w-full"
      onClick={() => setIsExpanded(!isExpanded)}
      onBlur={() => setIsExpanded(false)}
      tabIndex={1}
    >
      <AccountCard />
      {isExpanded && <ExpandedCard />}
    </section>
  );
};

export default AccountList;
