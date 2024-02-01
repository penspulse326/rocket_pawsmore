import Date from "./recordCard/Date";
import AddRecordBtn from "./recordCard/AddRecordBtn";

const RecordCardLayout = () => {
  return (
    <section className="flex flex-col gap-y-8 border border-stroke rounded-[30px] p-8 max-w-[480px]">
      <Date />
      <AddRecordBtn />
    </section>
  );
};

export default RecordCardLayout;
