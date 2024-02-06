import Image from "next/image";

const CreatePhase: React.FC = () => {
  return (
    <section className="flex justify-center items-center gap-6 mt-8">
      <div className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          1
        </span>
        <p className="text-xs">建立個人資料</p>
      </div>
      <Image
        src="/images/paws.svg"
        alt="paws"
        width={32}
        height={32}
        className="w-auto h-auto filter"
      />
      <div className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          2
        </span>
        <p className="text-xs">新增寵物檔案</p>
      </div>
      <Image
        src="/images/paws.svg"
        alt="paws"
        width={32}
        height={32}
        className="w-auto h-auto filter"
      />
      <div className="flex flex-col items-center gap-2 filter">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          3
        </span>
        <p className="text-xs">個人化推薦主題</p>
      </div>
    </section>
  );
};

export default CreatePhase;
