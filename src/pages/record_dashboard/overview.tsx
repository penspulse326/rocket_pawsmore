import Overview from "@/containers/overview";
import { NextPage } from "next";

const OverviewPage: NextPage = () => {
  return (
    <section className="pt-16 w-full">
      <section className="outter">
        <div className="inner">
          <Overview />
        </div>
      </section>
    </section>
  );
};

export default OverviewPage;
