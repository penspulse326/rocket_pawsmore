import {
  fetchFollowPet,
  fetchGetSpeciesAccounts,
} from "@/common/fetch/petProfile";
import useToken from "@/common/hooks/useToken";
import { RootState } from "@/common/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface AccountType {
  petId: number;
  petAccount: string;
  petName: string;
  petPhoto: string | null;
  petsfollowers: {
    id: number;
  }[];
}

const Recommend: React.FC = () => {
  const { token } = useToken();
  const { topic, userId } = useSelector((state: RootState) => state.userInfo);
  const petList = useSelector((state: RootState) => state.petList);
  const [list, setList] = useState<AccountType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPetAccounts = async () => {
    if (topic === null || isLoading) return;

    setIsLoading(true);

    const response = await fetchGetSpeciesAccounts(topic);
    if (!response.ok) {
      setList([]);
      return;
    }

    // 過濾掉自己有追蹤的帳號和自己的寵物
    const data = response.data;
    const exceptSelfData = data.filter((account: AccountType) =>
      petList.every((pet) => pet.petId !== account.petId)
    );
    const filteredData: AccountType[] = exceptSelfData.filter(
      (account: AccountType) =>
        account.petsfollowers.every((follower) => follower.id !== userId)
    );

    const randomItems = filteredData
      .sort((a, b) => b.petsfollowers.length - a.petsfollowers.length)
      .slice(0, 2);
    setList(() => randomItems);
    setIsLoading(false);
  };

  const handleFollowPet = async (petAccount: string, index: number) => {
    if (!token) {
      alert("請先登入");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    const response = await fetchFollowPet(petAccount, token);
    if (!response.ok) {
      alert("追蹤失敗，請稍候再試");
      setIsLoading(false);
      return;
    }

    await handleGetPetAccounts();

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetPetAccounts();
  }, []);

  return (
    <section>
      <h2 className="text-note">
        {list?.length === 0 || !list ? "暫無推薦" : "推薦帳號"}
      </h2>
      <ul className="flex flex-col gap-6 mt-4">
        {list?.map(({ petAccount, petName, petPhoto }, index) => (
          <li key={petAccount} className="flex justify-between items-center">
            <div className="flex items-center gap-4 max-w-[216px] w-full truncate">
              <Link
                href={`/pet/${petAccount}`}
                className="shrink-0 relative w-12 h-12 rounded-full overflow-hidden"
              >
                <Image
                  src={petPhoto || "/images/default-photo.png"}
                  alt={petName}
                  priority={false}
                  fill={true}
                  sizes="100%"
                  className="w-auto h-auto object-cover"
                />
              </Link>
              <Link href={`/pet/${petAccount}`}>
                <p>{petName}</p>
                <p>@{petAccount}</p>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => handleFollowPet(petAccount, index)}
              className="shrink-0 px-8 py-2 rounded-[30px] bg-primary text-white"
            >
              追蹤
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Recommend;
