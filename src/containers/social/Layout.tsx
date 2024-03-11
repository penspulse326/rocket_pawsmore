import { useSelector } from 'react-redux';

import LeftBar from './LeftBar';
import RightBar from './RightBar';

import type { RootState } from '@/common/redux/store';

interface PropsType {
  children: React.ReactNode;
}

function Layout({ children }: PropsType) {
  const { userId } = useSelector((state: RootState) => state.userInfo);

  if (!userId) {
    return null;
  }
  return (
    <section className='outer px-8'>
      <div className='inner relative flex justify-center'>
        <LeftBar />
        {children}
        <RightBar />
      </div>
    </section>
  );
}

export default Layout;
