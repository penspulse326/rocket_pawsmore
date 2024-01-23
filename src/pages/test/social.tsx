import SocialPostList from "@/components/SocialPostList";
import SideBarLeft from "@/components/SocialSideBarLeft";
import SideBarRight from "@/components/SocialSideBarRight";

export default function Social() {
  return (
    <section className="outer bg-orange-200">
      <div className="inner pt-16 h-screen grid grid-cols-12">
        <SideBarLeft />
        <SocialPostList />
        <SideBarRight />
      </div>
    </section>
  );
}
