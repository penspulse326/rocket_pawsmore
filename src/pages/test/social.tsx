import SocialPostList from "@/components/social/SocialPostList";
import SideBarLeft from "@/components/social/SocialSideBarLeft";
import SideBarRight from "@/components/social/SocialSideBarRight";

export default function Social() {
  return (
    <section className="outer px-8">
      <div className="inner mx-auto pt-16 h-screen grid grid-cols-12 gap-8">
        <SideBarLeft />
        <SocialPostList />
        <SideBarRight />
      </div>
    </section>
  );
}
