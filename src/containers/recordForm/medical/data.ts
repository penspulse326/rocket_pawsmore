export enum VisitType {
  看診 = 0,
  疫苗 = 1,
  健檢 = 2,
  結紮 = 3,
}

export const visitOptions = [
  { label: "看診", value: VisitType.看診 },
  { label: "疫苗", value: VisitType.疫苗 },
  { label: "健檢", value: VisitType.健檢 },
  { label: "結紮", value: VisitType.結紮 },
];
