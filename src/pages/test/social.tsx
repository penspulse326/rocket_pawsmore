import SocialPostList from "@/components/SocialPostList";
import SideBarLeft from "@/components/SocialSideBarLeft";
import SideBarRight from "@/components/SocialSideBarRight";

export default function Social() {
  return (
    <section className="outer">
      <div className="inner pt-16 px-4 2xl:px-12 h-screen grid grid-cols-12 gap-8">
        <SideBarLeft />
        <SocialPostList />
        <SideBarRight />
      </div>
    </section>
  );
}
