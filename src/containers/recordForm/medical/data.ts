export enum VisitType {
  無 = 0,
  看診 = 1,
  疫苗 = 2,
  健檢 = 3,
  結紮 = 4,
}

export const visitOptions = [
  { label: "看診", value: VisitType.看診 },
  { label: "疫苗", value: VisitType.疫苗 },
  { label: "健檢", value: VisitType.健檢 },
  { label: "結紮", value: VisitType.結紮 },
];
