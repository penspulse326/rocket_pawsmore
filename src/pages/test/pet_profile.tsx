import ProfileCard from "@/components/petProfile/ProfileCard";
import Footer from "@/components/petProfile/Footer";

export default function PetProfile() {
  return (
    <main className="flex flex-col gap-y-12 items-center mt-[64px]">
      <ProfileCard />
      <Footer />
    </main>
  );
}
