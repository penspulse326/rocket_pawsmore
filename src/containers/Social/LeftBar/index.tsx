import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SwiperList from '@/components/petInfo/SwiperList';
import MoreMenu from '@/containers/Social/LeftBar/MoreMenu';

import type { RootState } from '@/common/redux/store';

function LeftBar() {
  const router = useRouter();
  const { username, account, headShot } = useSelector((state: RootState) => state.userInfo);
  const petList = useSelector((state: RootState) => state.petList);

  const handleCheckProfile = (userAccount: string) => {
    router.push(`/member/${userAccount}`);
  };

  return (
    <aside
      style={{ height: 'calc(100vh - 64px)' }}
      className='sticky top-16 mr-8 mt-16 flex w-full max-w-[312px] flex-col py-8'
    >
      {/* 寵物檔案卡片 */}
      <SwiperList list={petList} />
      {/* 個人連結 */}
      <button
        type='button'
        onClick={() => handleCheckProfile(account)}
        className='flex gap-4 rounded-[30px] border border-stroke bg-white p-4 text-left duration-300 hover:cursor-pointer hover:bg-stroke'
      >
        <div className='relative h-[48px] w-[48px] overflow-hidden rounded-full'>
          <Image
            src={headShot || '/images/default-photo.png'}
            alt={username || 'avatar'}
            priority
            fill
            sizes='100%'
            style={{ objectFit: 'cover' }}
            className='h-auto w-auto'
          />
        </div>
        <div>
          <p>{username}</p>
          <p className='text-note'>@{account}</p>
        </div>
      </button>
      {/* 選單 */}
      <MoreMenu />
    </aside>
  );
}

export default LeftBar;
