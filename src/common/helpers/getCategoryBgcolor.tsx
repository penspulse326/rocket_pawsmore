const getCategoryBgcolor = (prop: string) => {
  switch (prop) {
    case "行為表現":
      return "bg-[#F9E6FF]";
    case "驚喜":
      return "bg-[#FFF5CF]";
    case "生活習慣":
      return "bg-[#FFE9EC]";
    case "社交":
      return "bg-[#D5F0FF]";
    case "技能":
      return "bg-[#E0FFDF]";
    default:
      return "";
  }
};

export default getCategoryBgcolor;
