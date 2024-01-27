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
];

const PetAccount = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPet, setSelectedPet] = useState(petAccounts[0]);

  return (
    <section className="relative min-w-[258px] w-full">
      <div className="flex gap-x-2 items-center border border-stroke rounded-[60px] p-2">
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
            <IconChevronUp
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <IconChevronDown
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="absolute top-[76px] bg-white border border-stroke rounded-[30px] p-2 min-w-[242px] w-full">
          {petAccounts.map((account, index) => {
            return (
              <ul
                className="flex gap-x-2 items-center rounded-[60px] p-2 hover:bg-secondary hover:cursor-pointer"
                onClick={() => setSelectedPet(petAccounts[index])}
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
      )}
    </section>
  );
};

export default PetAccount;
