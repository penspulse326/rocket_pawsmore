import { useState } from 'react';

import Footer from '@/components/Footer';
import Loading from '@/components/hint/Loading';
import UserProfile from '@/containers/UserProfile';

function UserProfileLayout() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loading />}
      <main className='mt-[112px] flex flex-col gap-y-16'>
        <div className='flex justify-center gap-x-16'>
          <UserProfile setIsLoading={setIsLoading} />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default UserProfileLayout;
