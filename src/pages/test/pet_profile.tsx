import Footer from "@/components/petProfile/Footer";

const ProfileCard = () => {
  return <section>Card</section>;
};
const ProfileGallery = () => {
  return <section>Gallery</section>;
};

export default function PetProfile() {
  return (
    <main className="flex flex-col gap-y-12 items-center mt-[64px]">
      <ProfileCard />
      <ProfileGallery />
      <Footer />
    </main>
  );
}
