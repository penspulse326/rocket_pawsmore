import Calendar from "@/components/recordDashboard/Calendar";
import Upcoming from "@/components/recordDashboard/Upcoming";
import PetAccount from "@/components/recordDashboard/PetAccount";
import RecordCard from "@/components/recordDashboard/RecordCard";
import Footer from "@/components/petProfile/Footer";

export default function RecordDashboard() {
  return (
    <section className="inner mt-[88px] flex flex-col gap-y-[64px]">
      <div className="flex justify-between gap-x-8">
        <div className="flex flex-col gap-y-4 max-w-[896px] w-full">
          <Calendar />
          <Upcoming />
        </div>
        <div className="flex flex-col gap-y-8">
          <PetAccount />
          <RecordCard />
        </div>
      </div>
      <Footer />
    </section>
  );
}
