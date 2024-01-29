import { useState } from "react";
import Image from "next/image";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface AccountType {
  name: string;
  photo: string;
  pet_id: string;
}
const petAccounts: AccountType[] = [
  {
    name: "角龍寶寶",
    photo: "/test/pet-avatar-1.png",
    pet_id: "littleprincess126",
  },
  {
    name: "貝貝",
    photo: "/test/pet-avatar-2.jpg",
    pet_id: "beibeiiiii",
  },
  {
    name: "貝貝",
    photo: "/test/pet-avatar-2.jpg",
    pet_id: "beibeiiiii",
  },
];

const PetAccount = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState(petAccounts[0]);

  const AccountCard = () => {
    return (
      <div className="flex gap-x-2 items-center border border-stroke rounded-[60px] p-2 hover:cursor-pointer">
        <Image
          src={selectedPet.photo}
          width={48}
          height={48}
          className="rounded-full"
          alt="pet avatar"
        />
        <div className="flex grow justify-between items-center">
          <ul>
            <li>{selectedPet.name}</li>
            <li className="text-note">@{selectedPet.pet_id}</li>
          </ul>
          {isExpanded ? (
            <IconChevronUp size={24} />
          ) : (
            <IconChevronDown size={24} />
          )}
        </div>
      </div>
    );
  };
  const ExpandedCard = () => {
    return (
      <div className="absolute top-[76px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.15)] rounded-[30px] p-2  w-full z-10">
        {petAccounts.map((account, index) => {
          return (
            <ul
              className="flex gap-x-2 items-center rounded-[60px] p-2 hover:bg-secondary hover:cursor-pointer"
              onClick={() => {
                setSelectedPet(petAccounts[index]);
                setIsExpanded(false);
              }}
              key={`${index}-${account.name}`}
            >
              <Image
                src={account.photo}
                width={48}
                height={48}
                className="rounded-full"
                alt="pet avatar"
              />
              <ol className="mr-2">
                <li>{account.name}</li>
                <li className="text-note">@{account.pet_id}</li>
              </ol>
            </ul>
          );
        })}
      </div>
    );
  };
  return (
    <section
      className="relative min-w-[258px] max-w-[258px]"
      onClick={() => setIsExpanded(!isExpanded)}
      onBlur={() => setIsExpanded(false)}
      tabIndex={1}
    >
      <AccountCard />
      {isExpanded && <ExpandedCard />}
    </section>
  );
};

export default PetAccount;
