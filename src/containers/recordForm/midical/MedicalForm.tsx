import { useContext, useState } from "react";

import ToggleGroup from "@/components/ToggleGroup";
import Select from "@/components/form/card/Select";
import { unitCategory } from "@/common/lib/formText";
import { PetIdContext } from "@/pages/record_dashboard";

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
  stool: string;
  vomit: string;
  symptom: string[];
  deworming: string;
  medicine: string;
  injection: string;
  rehab: string;
  selected: string[];
  remark: string;
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

interface PropsType {
  onClose: () => void;
}

const MedicalForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { petId } = useContext(PetIdContext);
  const [formState, setFormState] = useState(initailState);

  const handleTextChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    console.log(petId);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

export default MedicalForm;
