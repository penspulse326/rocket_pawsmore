import moment, { Moment } from "moment";
import React, { createContext, useState, useReducer, ReactNode } from "react";
import HeaderLayout from "./calendar/HeaderLayout";
import BodyLayout from "./calendar/BodyLayout";

// AppProvider
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MonthProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </MonthProvider>
  );
};

type MonthAction = { type: "PREVIOUS_MONTH" | "NEXT_MONTH" };

// change month
const monthReducer = (state: Moment, action: MonthAction) => {
  switch (action.type) {
    case "PREVIOUS_MONTH":
      return moment(state).clone().subtract(1, "month");
    case "NEXT_MONTH":
      return moment(state).clone().add(1, "month");
    default:
      return moment(state);
  }
};

export const MonthContext = createContext<{
  monthState: moment.Moment;
  dispatch: React.Dispatch<MonthAction>;
}>({
  monthState: moment(),
  dispatch: () => {},
});

const MonthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialMonthState: Moment = moment();
  const [monthState, dispatch] = useReducer<React.Reducer<Moment, MonthAction>>(
    monthReducer,
    initialMonthState
  );

  return (
    <MonthContext.Provider value={{ monthState, dispatch }}>
      {children}
    </MonthContext.Provider>
  );
};

// filter event category
export interface CategoryContextProps {
  filterEvent: string;
  setFilterEvent: React.Dispatch<React.SetStateAction<string>>;
}
export const CategoryContext = createContext<CategoryContextProps>({
  filterEvent: "全部類型",
  setFilterEvent: () => {},
});

const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterEvent, setFilterEvent] = useState("全部類型");
  return (
    <CategoryContext.Provider value={{ filterEvent, setFilterEvent }}>
      {children}
    </CategoryContext.Provider>
  );
};

const CalendarLayout = () => {
  return (
    <AppProvider>
      <section className="flex flex-col gap-y-8 max-w-[832px] border border-stroke rounded-[30px] p-8">
        <HeaderLayout />
        <BodyLayout />
      </section>
    </AppProvider>
  );
};

export default CalendarLayout;
