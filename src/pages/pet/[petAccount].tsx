import React from "react";

import ProfileCard from "@/components/petProfile/ProfileCard";
import ProfileGallery from "@/components/petProfile/ProfileGallery";
import Footer from "@/components/Footer";

const PetProfile: React.FC = () => {
  return (
    <main className="flex flex-col gap-y-12 items-center mt-[64px]">
      <ProfileCard />
      <ProfileGallery />
      <Footer />
    </main>
  );
};

export default PetProfile;
