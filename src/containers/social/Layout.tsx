import LeftBar from "./sideBar/LeftBar";
import RightBar from "./sideBar/RightBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="outer px-8">
      <div className="inner relative flex">
        <LeftBar />
        {children}
        <RightBar />
      </div>
    </section>
  );
};

export default Layout;
