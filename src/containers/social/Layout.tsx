import { useSelector } from "react-redux";

import LeftBar from "./sideBar/LeftBar";
import RightBar from "./sideBar/RightBar";

import type { RootState } from "@/common/redux/store";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useSelector((state: RootState) => state.userInfo);

  if (!userId) {
    return null;
  }
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
