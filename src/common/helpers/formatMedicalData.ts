export const formatSymptom = (value: string) => {
  if (!value) return "";

  return JSON.parse(value).join("、");
};
