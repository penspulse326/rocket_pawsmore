import moment from "moment";

const calendarLogic = (prop: string) => {
  const calendarArray = [];
  const totalDays = 42;

  // 取得當前月份第一天的日期
  const firstDayOfMonth = moment(prop).startOf("month");
  // 取得當前月份第一天所在的那一週的第一天(星期天)的日期
  const firstDateOfCalendar = firstDayOfMonth.clone().startOf("week");

  let eachWeek = [];
  for (let i = 0; i < totalDays; i++) {
    const currentDate = firstDateOfCalendar.clone().add(i, "days");
    eachWeek.push(currentDate.format("YYYY-MM-DD"));
    if (eachWeek.length === 7) {
      calendarArray.push(eachWeek);
      eachWeek = [];
    }
  }
  return calendarArray;
};

export default calendarLogic;
