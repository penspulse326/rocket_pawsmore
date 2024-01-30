import HeaderLayout from "./Calendar/HeaderLayout";
import BodyLayout from "./Calendar/BodyLayout";

const CalendarLayout = () => {
  return (
    <section className="flex flex-col gap-y-8 max-w-[832px] border border-stroke rounded-[30px] p-8">
      <HeaderLayout />
      <BodyLayout />
    </section>
  );
};

export default CalendarLayout;
