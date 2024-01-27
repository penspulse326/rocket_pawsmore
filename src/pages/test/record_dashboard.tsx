import Calendar from "@/components/recordDashboard/Calendar";
import Upcoming from "@/components/recordDashboard/Upcoming";
import PetAccount from "@/components/recordDashboard/PetAccount";
import RecordCard from "@/components/recordDashboard/RecordCard";

export default function RecordDashboard() {
  return (
    <section className="inner mt-[88px] flex justify-between">
      <div className="flex flex-col gap-y-4 max-w-[896px] w-full">
        <Calendar />
        <Upcoming />
      </div>
      <div className="flex flex-col gap-y-4">
        <PetAccount />
        <RecordCard />
      </div>
    </section>
  );
}
