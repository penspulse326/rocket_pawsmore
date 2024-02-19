import { DailyFormStateType } from "@/containers/recordForm/daily/DailyForm";
import { PooType, UrineType, VomitType } from "@/types/enums";

export const formatDailyData = (data: DailyFormStateType) => {
  const {
    weight,
    weight_unit,
    food,
    vomit,
    urine,
    poo,
    symptom,
    selected,
    ...rest
  } = data;

  const foodData = food.filter((item) => item.amount !== 0);

  const formattedData = {
    ...rest,
    weight: `${weight}.${weight_unit}`,
    food: JSON.stringify(foodData),
    vomit: VomitType[vomit],
    urine: UrineType[urine],
    poo: PooType[poo],
    symptom: JSON.stringify(symptom),
    selected: JSON.stringify(selected),
  };

  return formattedData;
};
