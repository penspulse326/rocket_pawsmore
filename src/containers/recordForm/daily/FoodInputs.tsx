import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { foodCategory } from "@/common/lib/formText";
import ErrorMessage from "@/components/ErrorMessage";

interface FoodType {
  id: number;
  type: "乾食" | "濕食" | "鮮食" | "點心" | "";
  amount: string;
}

const initialFood: FoodType = {
  id: 1,
  type: "乾食",
  amount: "",
};

const FoodInputList = () => {
  const [list, setList] = useState<FoodType[]>([initialFood]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (list.length < 5) {
      setIsError(false);
    }
  }, [list]);

  const handleValueChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const eventType = event.currentTarget.tagName;
    let newData = list[index];

    switch (eventType) {
      case "SELECT":
        const type = event.currentTarget.value as FoodType["type"];
        newData = { ...newData, type };
        break;
      case "INPUT":
        const amount = event.currentTarget.value;
        newData = { ...newData, amount };
        break;
      default:
        break;
    }

    const newList = [...list];
    newList.splice(index, 1, newData);
    setList(newList);
  };

  const handleAdd = () => {
    if (list.length >= 5) {
      setIsError(true);
      return;
    }
    setList([...list, initialFood]);
  };

  const handleDelete = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <ul className="flex flex-col gap-1">
      {list.map((food: FoodType, index) => (
        <li key={food.id + index} className="flex items-center">
          {/* 類型篩選 */}
          <select
            name="food"
            value={food.type}
            onChange={(e) => handleValueChange(e, index)}
            className="mr-1 px-2 py-1 w-[72px] border border-stroke outline-note rounded-[10px]"
          >
            <option disabled>類型</option>
            {foodCategory.map((category) => (
              <option key={category + index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* 數量 */}
          <input
            type="text"
            name="amount"
            value={food.amount}
            onChange={(e) => handleValueChange(e, index)}
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

export default FoodInputList;
