import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/common/redux/store";

import type { PetDataType } from "@/types";
import Link from "next/link";

interface PropsType {
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AccountList: React.FC<PropsType> = ({ setId }) => {
  const petList = useSelector((state: RootState) => state.petList);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDataType>(petList[0]);

  useEffect(() => {
    if (selectedPet) {
      setId(selectedPet.petId);
    }
  }, [selectedPet]);

  const AccountCard = () => {
    return (
      <div className="flex gap-x-2 items-center w-full border border-stroke rounded-[60px] p-2 hover:cursor-pointer">
        <div className="relative max-w-12 max-h-12 w-full h-full rounded-full overflow-hidden">
          <Image
            src={selectedPet.petPhoto || "/images/default-photo.png"}
            alt={selectedPet.petAccount}
            priority={false}
            fill={true}
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="w-auto h-auto"
          />
        </div>
        <div className="flex grow justify-between items-center">
          <ul>
            <li>{selectedPet.petName}</li>
            <li className="text-note">@{selectedPet.petAccount}</li>
          </ul>

          <IconChevronDown
            size={24}
            className={`${isExpanded && "rotate-180"} mr-2`}
          />
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
              <div className="relative max-w-12 max-h-12 w-full h-12 rounded-full overflow-hidden">
                <Image
                  src={petPhoto || "/images/default-photo.png"}
                  alt={petAccount}
                  priority={false}
                  fill={true}
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  className="w-auto h-auto"
                />
              </div>
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
      className="relative flex flex-col justify-center items-center max-w-[250px] w-full h-16"
      onClick={() => setIsExpanded(!isExpanded)}
      onBlur={() => setIsExpanded(false)}
      tabIndex={1}
    >
      {selectedPet ? (
        <AccountCard />
      ) : (
        <Link href="#" className="text-primary font-bold">
          您尚未建立寵物檔案
        </Link>
      )}
      {isExpanded && <ExpandedCard />}
    </section>
  );
};

export default AccountList;
