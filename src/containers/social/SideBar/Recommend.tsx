import Image from "next/image";
import Link from "next/link";

const accountList = [
  {
    pet_id: "123",
    pet_name: "黑角龍",
    pet_account: "blk_diablos",
    photoUrl: "/test/photo-cat-test-2.png",
  },
  {
    pet_id: "456",
    pet_name: "陳嘟嘟",
    pet_account: "duduchen123",
    photoUrl: "/test/photo-dog-test-2.png",
  },
];

const Recommend: React.FC = () => {
  return (
    <section>
      <h2 className="text-note">為您推薦</h2>
      <ul className="flex flex-col gap-6 mt-4">
        {accountList.map(({ pet_id, pet_name, pet_account, photoUrl }) => (
          <li key={pet_id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#">
                <Image
                  src={photoUrl}
                  width={48}
                  height={48}
                  alt={pet_name}
                  className="rounded-full"
                />
              </Link>
              <Link href="#">
                <p>{pet_name}</p>
                <p>@{pet_account}</p>
              </Link>
            </div>
            <button
              type="button"
              className="px-8 py-2 rounded-[30px] bg-primary text-white"
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
