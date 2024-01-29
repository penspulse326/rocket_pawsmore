import SideBarLeft from "./SideBarLeft";

const SocialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="outer px-8">
      <div className="inner grid grid-cols-12 gap-8 pt-16 h-screen">
        <SideBarLeft />
        {children}
      </div>
    </section>
  );
};

export default SocialLayout;
