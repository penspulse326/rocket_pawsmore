import Navbar from "@/components/Navbar";
import SocialPostList from "@/components/SocialPostList";
import SideBarLeft from "@/components/SocialSideBarLeft";
import SideBarRight from "@/components/SocialSideBarRight";

export default function Social() {
  return (
    <>
      <Navbar></Navbar>
      <main className="outer bg-orange-200">
        <div className="inner grid grid-cols-12">
          <SideBarLeft />
          <SocialPostList />
          <SideBarRight />
        </div>
      </main>
    </>
  );
}
