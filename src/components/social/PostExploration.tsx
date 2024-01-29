import Image from "next/image";

const postData = [
  {
    id: 1,
    photoUrl: "/test/exp-dog-1.jpg",
  },
  {
    id: 2,
    photoUrl: "/test/exp-dog-2.jpg",
  },
  {
    id: 3,
    photoUrl: "/test/exp-dog-3.jpg",
  },
  {
    id: 4,
    photoUrl: "/test/exp-dog-4.jpg",
  },
  {
    id: 5,
    photoUrl: "/test/exp-dog-1.jpg",
  },
  {
    id: 6,
    photoUrl: "/test/exp-dog-2.jpg",
  },
  {
    id: 7,
    photoUrl: "/test/exp-dog-3.jpg",
  },
  {
    id: 8,
    photoUrl: "/test/exp-dog-4.jpg",
  },
  {
    id: 9,
    photoUrl: "/test/exp-dog-1.jpg",
  },
  {
    id: 10,
    photoUrl: "/test/exp-dog-2.jpg",
  },
  {
    id: 11,
    photoUrl: "/test/exp-dog-3.jpg",
  },
  {
    id: 12,
    photoUrl: "/test/exp-dog-4.jpg",
  },
];

const PostExploration = () => {
  return (
    <div className="scrollbar-none col-span-6 p-8 border-x border-stroke bg-white overflow-y-scroll">
      <h1 className="text-[32px]">探索頁面</h1>
      <Image
        src="/test/exp-dog.jpg"
        width={144}
        height={144}
        alt="探索頁面"
        className="my-4 mx-auto rounded-full"
      />
      <h2 className="text-2xl text-center">狗</h2>

      <section className="grid grid-cols-3 gap-2 mt-8">
        {postData.map((item, index) => (
          <button
            type="button"
            key={`${index}${item.id}`}
            className={`${
              (index + 1) % 5 === 0 && index % 3 !== 2
                ? "col-span-2 row-span-2"
                : "col-span-1"
            } rounded-[30px]`}
          >
            <Image
              key={item.id}
              src={item.photoUrl}
              width={200}
              height={200}
              alt="狗狗"
              className="w-full h-full rounded-[30px]"
            />
          </button>
        ))}
        {postData.map((item, index) => (
          <button
            type="button"
            key={`${index}${item.id}`}
            className={`${
              (index + 1) % 5 === 0 && index % 3 !== 2
                ? "col-span-2 row-span-2"
                : "col-span-1"
            } rounded-[30px]`}
          >
            <Image
              key={item.id}
              src={item.photoUrl}
              width={200}
              height={200}
              alt="狗狗"
              className="w-full h-full rounded-[30px]"
            />
          </button>
        ))}
      </section>
    </div>
  );
};

export default PostExploration;
