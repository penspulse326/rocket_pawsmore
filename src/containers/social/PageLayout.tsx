import LeftBar from "./SideBar/LeftBar";
import RightBar from "./SideBar/RightBar";

const SocialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="outer px-8">
      <div className="inner grid grid-cols-12 gap-8 pt-16 h-screen">
        <LeftBar />
        {children}
        <RightBar />
      </div>
    </section>
  );
};

export default SocialLayout;
