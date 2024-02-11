const getPetSpecies = (prop: number) => {
  switch (prop) {
    case 0:
      return "狗";
    case 1:
      return "貓";
    case 2:
      return "倉鼠";
    case 3:
      return "其他";
    default:
      return null;
  }
};

export default getPetSpecies;
