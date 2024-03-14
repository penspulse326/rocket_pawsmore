import { DailyFormStateType } from '@/containers/recordForm/daily';
import { DailyDataType } from '@/common/types';
import { PooType, UrineType, VomitType } from '@/common/types/enums';

export const formatDailyData = (data: DailyFormStateType): DailyDataType => {
  const { weight, weight_unit, food, vomit, urine, poo, symptom, selected, water, ...rest } = data;

  const foodData = food.filter((item) => item.amount !== 0);
  console.log(foodData);

  const formattedData = {
    ...rest,
    water: Number(water),
    weight: `${weight}.${weight_unit}`,
    food: JSON.stringify(foodData),
    vomit: vomit && VomitType[vomit],
    urine: urine && UrineType[urine],
    poo: poo && PooType[poo],
    symptom: JSON.stringify(symptom),
    selected: JSON.stringify(selected),
  };

  return formattedData;
};
