import moment from "moment";

import { originalData } from "../lib/test/eventData";

const createBirthdayEvent = ({
  birthday,
  adoptedDate,
  petId,
}: {
  birthday: string;
  adoptedDate: string;
  petId: number;
}) => {
  const futureYears = 10;
  const isBirthdayExisting = originalData.some(
    (event) => event.category === "生日"
  );
  const isAdoptedDateExisting = originalData.some(
    (event) => event.category === "領養日"
  );

  if (!isBirthdayExisting) {
    for (let i = 0; i < futureYears; i++) {
      const birthdayDate = moment(birthday)
        .add(i, "years")
        .format("YYYY-MM-DD");
      const id = Number(`${petId}${moment(birthdayDate).format("YYYYMMDD")}`);

      const birthdayEvent = {
        id: id,
        card: "紀念日",
        created_at: moment().format("YYYY-MM-DD"),
        target_date: birthdayDate,
        category: "生日",
        content: `第 ${i} 週年`,
      };
      originalData.push(birthdayEvent);
    }
  } else if (!isAdoptedDateExisting) {
    for (let i = 0; i < futureYears; i++) {
      const date = moment(adoptedDate).add(i, "years").format("YYYY-MM-DD");
      const id = Number(`${petId}${moment(date).format("YYYYMMDD")}`);

      const adoptedDateEvent = {
        id: id,
        card: "紀念日",
        created_at: moment().format("YYYY-MM-DD"),
        target_date: date,
        category: "領養日",
        content: `第 ${i} 週年`,
      };
      originalData.push(adoptedDateEvent);
    }
  }
};

export default createBirthdayEvent;
