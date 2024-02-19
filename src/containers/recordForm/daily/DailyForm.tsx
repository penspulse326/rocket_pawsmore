import { useContext, useState } from "react";

import ToggleGroup from "@/components/ToggleGroup";
import FoodInputs from "./FoodInputs";
import CareInputs from "./CareInputs";
import SickInputs from "./SickInputs";
import Select from "@/components/form/card/Select";
import { unitCategory } from "@/common/lib/formText";
import { DateContext, PetIdContext } from "@/pages/record_dashboard";
import { formatDailyData } from "@/common/helpers/formatDailyData";

interface FoodType {
  type: string;
  amount: number;
}

export interface DailyFormStateType {
  weight: number;
  weight_unit: "kg" | "g";
  water: number;
  food: FoodType[];
  urine: string;
  poo: string;
  vomit: string;
  symptom: string[];
  deworming: string;
  medicine: string;
  injection: string;
  rehab: string;
  selected: string[];
  remark: string;
  targetDate: string;
}

const initailState: DailyFormStateType = {
  weight: 0,
  weight_unit: "kg",
  water: 0,
  food: [
    {
      type: "乾食",
      amount: 0,
    },
  ],
  urine: "",
  poo: "",
  vomit: "",
  symptom: [],
  deworming: "",
  medicine: "",
  injection: "",
  rehab: "",
  selected: [],
  remark: "",
  targetDate: "",
};

interface PropsType {
  onClose: () => void;
}

const DailyForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { selectedDate } = useContext(DateContext);
  const { petId } = useContext(PetIdContext);
  const [formState, setFormState] = useState({
    ...initailState,
    targetDate: selectedDate,
  });

  console.log(formState);

  const handleFoodChange = (value: FoodType[]) => {
    setFormState((prev) => ({ ...prev, food: value }));
  };

  const handleRadioChange = (name: string, value: boolean) => {
    const selected = [...formState.selected];
    let newState = { ...formState };

    if (!value) {
      // 只有症狀會被重置成 []，其他都是 ""
      const newValue = name === "symptom" ? [] : "";
      selected.splice(selected.indexOf(name), 1);
      newState = { ...newState, [name]: newValue };
    } else {
      selected.push(name);
    }
    setFormState({ ...newState, selected });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChange = (name: string, value: boolean) => {
    const symptom = [...formState.symptom];

    if (!value) {
      symptom.splice(symptom.indexOf(name), 1);
    } else {
      symptom.push(name);
    }
    setFormState((prev) => ({ ...prev, symptom }));
  };

  const handleTextChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    formatDailyData(formState);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ToggleGroup title="一般">
        <ul className="flex flex-col gap-4 mt-2">
          <li className="flex items-center">
            <span className="mr-8 font-semibold">體重</span>
            <input
              name="weight"
              type="number"
              min={0}
              value={formState.weight}
              onChange={(e) => handleTextChange("weight", e.target.value)}
              className="form-input mr-1 w-16"
            />
            <Select
              title="單位"
              options={unitCategory}
              onChange={(e) => handleSelectChange("weight_unit", e)}
            />
          </li>
          <li>
            <span className="mr-4 font-semibold">飲水量</span>
            <input
              type="number"
              min={0}
              value={formState.water}
              onChange={(e) => handleTextChange("water", e.target.value)}
              className="form-input mr-1 w-16"
            />
            <span>ml</span>
          </li>
          <li className="flex">
            <span className="mr-8 my-1 font-semibold">進食</span>
            <FoodInputs
              list={formState.food}
              onChange={(value: FoodType[]) => handleFoodChange(value)}
            />
          </li>
        </ul>
      </ToggleGroup>
      <ToggleGroup title="異常">
        <SickInputs
          formState={formState}
          onRadioChange={handleRadioChange}
          onSelectChange={handleSelectChange}
          onMultiChange={handleMultiChange}
        />
      </ToggleGroup>
      <ToggleGroup title="日常照護">
        <CareInputs
          formState={formState}
          onRadioChange={handleRadioChange}
          onTextChange={handleTextChange}
        />
      </ToggleGroup>
      <div className="flex flex-col gap-4">
        <span className="text-note">備註</span>
        <textarea
          name="remark"
          value={formState.remark}
          onChange={(e) => handleTextChange("remark", e.target.value)}
          placeholder="其他特殊情況或遺漏的資訊，請填寫於此。"
          className="px-4 py-3 h-24 border border-stroke rounded-[10px]"
        ></textarea>
      </div>
      <button type="submit" className="py-2 rounded-full bg-primary text-white">
        儲存
      </button>
    </form>
  );
};

export default DailyForm;
