import CalendarLayout from "@/containers/recordDashboard/CalendarLayout";
import Upcoming from "@/components/recordDashboard/Upcoming";
import PetAccount from "@/components/recordDashboard/PetAccount";
import RecordCard from "@/components/recordDashboard/RecordCard";
import Footer from "@/components/petProfile/Footer";

export default function RecordDashboard() {
  const DataSummaryBtn = () => {
    return (
      <button
        className="text-primary font-bold border border-stroke rounded-[30px] px-8 py-4 hover:cursor-pointer"
        type="button"
      >
        查看數據總覽
      </button>
    );
  };
  return (
    <section className="inner mt-[96px] flex flex-col gap-y-[64px]">
      <div className="flex justify-between gap-x-8">
        <div className="flex flex-col gap-y-4 max-w-[896px] w-full">
          <CalendarLayout />
          <Upcoming />
        </div>
        <div className="flex flex-col gap-y-8 max-w-[480px]">
          <div className="flex justify-between">
            <PetAccount />
            <DataSummaryBtn />
          </div>
          <RecordCard />
        </div>
      </div>
      <Footer />
    </section>
  );
}
