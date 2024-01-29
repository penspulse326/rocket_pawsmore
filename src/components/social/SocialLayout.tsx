import SideBarLeft from "./SocialSideBarLeft";
import SideBarRight from "./SocialSideBarRight";

const SocialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="outer px-8">
      <div className="inner grid grid-cols-12 gap-8 pt-16 h-screen">
        <SideBarLeft />
        {children}
        <SideBarRight />
      </div>
    </section>
  );
};

export default SocialLayout;
