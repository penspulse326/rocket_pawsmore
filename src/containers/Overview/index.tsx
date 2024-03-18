import { IconHeartRateMonitor } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import Loading from '@/components/hint/Loading';

import Explanation from './Explanation';
import SwiperList from './PetCard/SwiperList';
import RecentCondition from './RecentCondition';
import TableView from './TableView';

function Overview() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className='max-w-[1344px]'>
      {isLoading && <Loading />}
      {/* 頁面標題與連結 */}
      <div className='mt-8 flex w-full justify-between'>
        <h2 className='flex items-center gap-2 text-2xl'>
          <IconHeartRateMonitor size={36} />
          數據總覽
        </h2>
        <Link
          href='/record_dashboard'
          className='flex items-center self-center rounded-[30px] border border-stroke px-8 py-4 font-bold text-primary duration-300 hover:bg-primary hover:text-white'
        >
          返回紀錄頁面
        </Link>
      </div>
      {/* 頁面內容 */}
      <div className='mt-4 flex max-h-[386px] gap-[43px]'>
        <div className='max-w-[265px]'>
          <SwiperList setIsLoading={setIsLoading} />
        </div>
        <RecentCondition />
        <Explanation />
      </div>
      <div className='mt-16'>
        <h2 className='flex items-center gap-2 text-2xl'>紀錄總覽</h2>
      </div>
      <TableView />
    </section>
  );
}

export default Overview;
