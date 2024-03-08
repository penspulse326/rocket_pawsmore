import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import SideBar from "@/containers/userDashboard/SideBar";
import PetProfile from "@/components/userDashboard/PetProfile";
import Footer from "@/components/Footer";

const EditPet = () => {
  const router = useRouter();

  const params = useSearchParams();
  const to = params.get("to") || "";

  const [targetPage, setTargetPage] = useState(to);

  const handleSelectPage = (targetPage: string) => {
    setTargetPage(targetPage);
    router.push(`/user_dashboard?to=${targetPage}`, undefined, {
      shallow: true,
    });
  };

  return (
    <main className="outer pt-16 flex h-screen relative">
      <SideBar target={to} setTargetPage={handleSelectPage} />
      <div className="flex flex-col gap-y-16 justify-between w-full pl-[248px]">
        <PetProfile />
        <Footer />
      </div>
    </main>
  );
};

export default EditPet;
