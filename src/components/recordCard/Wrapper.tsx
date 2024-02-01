import { IconX } from "@tabler/icons-react";

const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="flex flex-col gap-6 p-8 w-[416px] border border-stroke rounded-[30px] bg-white">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            <span className="inline-block mr-4 w-[11px] h-[11px] rounded-full bg-[#969AFF]"></span>
            新增日常紀錄
          </h2>
          <button type="button">
            <IconX size={32} stroke={2} />
          </button>
        </div>
        <h3 className="mt-1 text-note">
          可讓醫生參考的生理紀錄及在家可處理的照護。
        </h3>
      </div>
      {children}
    </section>
  );
};

export default CardWrapper;
