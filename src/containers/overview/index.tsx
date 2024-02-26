import { useSelector } from "react-redux";
import Link from "next/link";
import { IconHeartRateMonitor } from "@tabler/icons-react";

import SwiperList from "@/components/petInfo/SwiperList";
import RecentCondition from "./RecentCondition";
import Explanation from "./Explanation";
import TableView from "./TableView";
import Footer from "@/components/Footer";

import { RootState } from "@/common/redux/store";

const Overview: React.FC = () => {
  const petList = useSelector((state: RootState) => state.petList);

  return (
    <section className="max-w-[1344px]">
      {/* 頁面標題與連結 */}
      <div className="flex justify-between mt-8">
        <h2 className="flex items-center gap-2 text-2xl">
          <IconHeartRateMonitor size={36} />
          近期總覽
        </h2>
        <Link
          href="/record_dashboard"
          className="flex items-center text-primary font-bold border border-stroke rounded-[30px] px-8 py-4 duration-300 hover:bg-primary hover:text-white"
        >
          返回紀錄頁面
        </Link>
      </div>
      {/* 頁面內容 */}
      <div className="flex gap-12 mt-4 max-h-[386px]">
        <div className="max-w-[254px]">
          <SwiperList list={petList} />
        </div>
        <RecentCondition />
        <Explanation />
      </div>
      <div className="mt-16">
        <h2 className="flex items-center gap-2 text-2xl">紀錄總覽</h2>
      </div>
      <TableView />
      <div className="mt-[72px]">
        <Footer />
      </div>
    </section>
  );
};

export default Overview;