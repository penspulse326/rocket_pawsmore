import { createContext, useState, ReactNode } from "react";
import HeaderLayout from "./calendar/HeaderLayout";
import BodyLayout from "./calendar/BodyLayout";

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
    <CategoryProvider>
      <section className="flex flex-col gap-y-8 max-w-[832px] border border-stroke rounded-[30px] p-8">
        <HeaderLayout />
        <BodyLayout />
      </section>
    </CategoryProvider>
  );
};

export default CalendarLayout;
