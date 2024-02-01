import { useState } from "react";

import ToggleList from "@/components/ToggleList";
import CardWrapper from "../Wrapper";
import FoodList from "./FoodList";
import CareList from "./CareList";

export interface CareStateType {
  deworming: boolean;
  medicine: boolean;
  injection: boolean;
  rehab: boolean;
  deworming_text: string;
  medicine_text: string;
  injection_text: string;
  rehab_text: string;
  [key: string]: boolean | string;
}

const initialCareState = {
  deworming: false,
  medicine: false,
  injection: false,
  rehab: false,
  deworming_text: "",
  medicine_text: "",
  injection_text: "",
  rehab_text: "",
};

const Daily = () => {
  const [careState, setCareState] = useState<CareStateType>(initialCareState);

  console.log(careState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
  };

  return (
    <CardWrapper category="daily">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                min={0}
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-1 outline-note rounded-[10px]"
              />
              <select
                name="weight_unit"
                className="px-2 py-1 w-[72px] border border-stroke outline-1 outline-note rounded-[10px]"
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
                min={0}
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li className="flex">
              <span className="mr-8 my-1 font-semibold">進食</span>
              <FoodList />
            </li>
          </ul>
        </ToggleList>
        <ToggleList title="日常照護">
          <CareList careState={careState} setCareState={setCareState} />
        </ToggleList>
        <div className="flex flex-col gap-4">
          <span className="text-note">備註</span>
          <textarea
            name=""
            placeholder="其他特殊情況或遺漏的資訊，請填寫於此。"
            className="px-4 py-3 h-24 border border-stroke rounded-[10px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-2 rounded-full bg-primary text-white"
        >
          儲存
        </button>
      </form>
    </CardWrapper>
  );
};

export default Daily;
