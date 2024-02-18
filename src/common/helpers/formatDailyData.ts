import { DailyFormStateType } from "@/containers/recordForm/daily/DailyForm";

export const formatDailyData = (data: DailyFormStateType) => {
  const { weight, weight_unit, food, symptom, selected, ...rest } = data;
  const formattedData = {
    ...rest,
    weight: `${weight}.${weight_unit}`,
    food: JSON.stringify(food),
    symptom: JSON.stringify(symptom),
    selected: JSON.stringify(selected),
  };
  console.log(formattedData);
};
