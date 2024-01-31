import ProfileCard from "@/components/petProfile/ProfileCard";
import ProfileGallery from "@/components/petProfile/ProfileGallery";
import Footer from "@/components/Footer";

export default function PetProfile() {
  return (
    <main className="flex flex-col gap-y-12 items-center mt-[64px]">
      <ProfileCard />
      <ProfileGallery />
      <Footer />
    </main>
  );
}
