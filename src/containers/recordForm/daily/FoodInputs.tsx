import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { foodCategory } from "@/common/lib/formText";
import ErrorMessage from "@/components/ErrorMessage";
import Select from "@/components/form/Select";

interface FoodType {
  type: string;
  amount: number;
}

const initialFood: FoodType = {
  type: "乾食",
  amount: 0,
};

interface FoodInputsType {
  list: FoodType[];
  onChange: (value: FoodType[]) => void;
}

const FoodInputs: React.FC<FoodInputsType> = ({
  list,
  onChange: handleFoodChange,
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (list.length < 5) setIsError(false);
  }, [list]);

  const handleSelectChange = (index: number, value: string) => {
    let newData = list[index];
    newData = { ...newData, type: value };

    const newList = [...list].splice(index, 1, newData);
    handleFoodChange(newList);
  };

  const handleValueChange = (index: number, value: string) => {
    const amount = parseInt(value);

    let newData = list[index];
    newData = { ...newData, amount };

    const newList = [...list].splice(index, 1, newData);
    handleFoodChange(newList);
  };

  const handleAdd = () => {
    if (list.length >= 5) {
      setIsError(true);
      return;
    }
    handleFoodChange([...list, initialFood]);
  };

  const handleDelete = (index: number) => {
    handleFoodChange(list.filter((_, i) => i !== index));
  };

  return (
    <ul className="flex flex-col gap-1">
      {list.map((food: FoodType, index) => (
        <li key={food.type + index} className="flex items-center">
          {/* 類型篩選 */}
          <Select
            title="類型"
            options={foodCategory}
            onChange={(value: string) => handleSelectChange(index, value)}
          />
          {/* 重量 */}
          <input
            type="text"
            name="amount"
            value={food.amount}
            onChange={(e) => handleValueChange(index, e.target.value)}
            className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
          />
          {/* 按鈕 */}
          <span className="mr-4">g</span>
          {index === list.length - 1 && (
            <button type="button" onClick={handleAdd}>
              <IconCirclePlus size={24} className="stroke-primary" />
            </button>
          )}
          {list.length !== 1 && (
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="mr-2"
            >
              <IconCircleMinus size={24} className="stroke-primary" />
            </button>
          )}
        </li>
      ))}
      {isError && (
        <li className="mt-2">
          <ErrorMessage>你家還缺毛孩嗎？我願意當隻豬 &#128055;</ErrorMessage>
        </li>
      )}
    </ul>
  );
};

export default FoodInputs;