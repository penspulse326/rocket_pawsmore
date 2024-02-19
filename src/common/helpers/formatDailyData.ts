import { DailyFormStateType } from "@/containers/recordForm/daily/DailyForm";

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
    symptom: JSON.stringify(symptom),
    selected: JSON.stringify(selected),
  };
  console.log(formattedData);
};
