import { IconX } from "@tabler/icons-react";
import ToggleList from "@/components/ToggleList";

const Daliy = () => {
  return (
    <section className="flex flex-col gap-6 p-8 w-[416px] border border-stroke rounded-[30px]">
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
      <form className="flex flex-col gap-4">
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <select
                name="weight_unit"
                className="px-2 py-1 w-[72px] border border-stroke outline-note rounded-[10px]"
              >
                <option disabled>單位</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </li>
            <li>
              <span className="mr-4 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li>
              <span className="mr-8 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
          </ul>
        </ToggleList>
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <select
                name="weight_unit"
                className="px-2 py-1 w-[72px] border border-stroke outline-note rounded-[10px]"
              >
                <option disabled>單位</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </li>
            <li>
              <span className="mr-4 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li>
              <span className="mr-8 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
          </ul>
        </ToggleList>
        <div className="flex flex-col gap-4">
          <span className="text-note">備註</span>
          <textarea
            name=""
            className="h-24 border border-stroke rounded-[10px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-2 rounded-full bg-primary text-white"
        >
          登入
        </button>
      </form>
    </section>
  );
};
export default Daliy;
