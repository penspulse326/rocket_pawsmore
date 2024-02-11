import moment from "moment";
import { DataType } from "../lib/test/eventData";

interface SortedDataType {
  ageInMonth: number;
  events: {
    date: string;
    events: DataType[];
  }[];
}

function sortByAge(originalData: DataType[]): SortedDataType[] {
  const birthday: string = "2023-08-01T00:00:00";

  const sortedData: SortedDataType[] = [];

  originalData
    .sort((a, b) => {
      const dateA =
        a.type === "醫療提醒" ? moment(a.reserve_at) : moment(a.target_date);
      const dateB =
        b.type === "醫療提醒" ? moment(b.reserve_at) : moment(b.target_date);
      if (dateA.isAfter(dateB)) return -1;
      if (dateA.isBefore(dateB)) return 1;
      return 0;
    })
    .forEach((event) => {
      const date =
        (event.type === "醫療提醒" && event.reserve_at) || event.target_date;
      const ageInMonth = moment(date).diff(
        moment(birthday).format("YYYY-MM-DD"),
        "month"
      );

      let ageGroup = sortedData.find(
        (group) => group.ageInMonth === ageInMonth
      );
      if (!ageGroup) {
        ageGroup = { ageInMonth, events: [] };
        sortedData.push(ageGroup);
      }

      let dateGroup = ageGroup.events.find(
        (group) => group.date === moment(date).format("YYYY-MM-DD")
      );
      if (!dateGroup) {
        dateGroup = { date: moment(date).format("YYYY-MM-DD"), events: [] };
        ageGroup.events.push(dateGroup);
      }
      dateGroup.events.push(event);
    });
  return sortedData;
}

export default sortByAge;
