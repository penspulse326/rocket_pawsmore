const getIconColor = (prop: string) => {
  switch (prop) {
    case "日常紀錄":
      return "#969AFF";
    case "重要時刻":
      return "#FFA959";
    case "醫療紀錄":
      return "#FF6D80";
    default:
      return "";
  }
};

export default getIconColor;
