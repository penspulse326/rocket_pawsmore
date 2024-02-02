import { useState } from "react";

import RecordFormLayout from "../RecordFormLayout";
import ToggleGroup from "@/components/ToggleGroup";
import FoodInputs from "./FoodInputs";
import CareInputs from "./CareInputs";
import SickInputs from "./SickInputs";

export interface SickStateType {
  urine: boolean;
  stool: boolean;
  vomit: boolean;
  symptom: boolean;
  urine_text: string;
  stool_text: string;
  vomit_text: string;
  symptom_text: string[];
  [key: string]: boolean | string | string[];
}

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

const initailState = {
  weight: 0,
  weight_unit: "kg",
  water: 0,
  foods: [
    {
      type: "乾食",
      amount: 0,
    },
  ],
  urine: "",
  stool: "",
  vomit: "",
  symptom: [],
  deworming: "",
  medicine: "",
  injection: "",
  rehab: "",
  selected: [],
  remark: "",
};

const initialSickState: SickStateType = {
  urine: false,
  stool: false,
  vomit: false,
  symptom: false,
  urine_text: "",
  stool_text: "",
  vomit_text: "",
  symptom_text: [],
};

const initialCareState: CareStateType = {
  deworming: false,
  medicine: false,
  injection: false,
  rehab: false,
  deworming_text: "",
  medicine_text: "",
  injection_text: "",
  rehab_text: "",
};

const DailyForm = () => {
  const [sickState, setSickState] = useState(initialSickState);
  const [careState, setCareState] = useState(initialCareState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <RecordFormLayout category="daily">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ToggleGroup title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                min={0}
                className="form-input mr-1 w-16"
              />
              <select name="weight_unit" className="form-input w-[72px]">
                <option disabled>單位</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </li>
            <li>
              <span className="mr-4 font-semibold">飲水量</span>
              <input type="number" min={0} className="form-input mr-1 w-16" />
              <span>ml</span>
            </li>
            <li className="flex">
              <span className="mr-8 my-1 font-semibold">進食</span>
              <FoodInputs />
            </li>
          </ul>
        </ToggleGroup>
        <ToggleGroup title="異常">
          <SickInputs sickState={sickState} setSickState={setSickState} />
        </ToggleGroup>
        <ToggleGroup title="日常照護">
          <CareInputs careState={careState} setCareState={setCareState} />
        </ToggleGroup>
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
    </RecordFormLayout>
  );
};

export default DailyForm;
