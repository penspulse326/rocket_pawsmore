import moment from "moment";

const getPetAge = (birthday: string) => {
  const year = moment().diff(moment(birthday), "year");
  const month = moment().diff(moment(birthday), "month") % 12;
  return `${year} 歲 ${month} 月`;
};

export default getPetAge;
