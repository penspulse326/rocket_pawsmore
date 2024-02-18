import LeftBar from "./sideBar/LeftBar";
import RightBar from "./sideBar/RightBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export default Layout;
