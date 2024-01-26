import SocialPostList from "@/components/social/SocialPostList";
import SideBarLeft from "@/components/social/SocialSideBarLeft";
import SideBarRight from "@/components/social/SocialSideBarRight";

export default function Social() {
  return (
    <section className="outer px-8 overflow-visible">
      <div className="inner relative mx-auto pt-16 h-screen grid grid-cols-12 gap-8  overflow-visible">
        <SideBarLeft />
        <SocialPostList />
        <SideBarRight />
      </div>
    </section>
  );
}
