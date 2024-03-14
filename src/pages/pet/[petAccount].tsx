import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Footer from '@/components/Footer';
import Loading from '@/components/hint/Loading';
import PetProfile from '@/containers/PetProfile';

function PetProfileLayout() {
  const router = useRouter();
  const { petAccount } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loading />}
      <main className='mt-[64px] flex flex-col items-center gap-y-12'>
        <PetProfile petAccount={petAccount} setIsLoading={setIsLoading} />
        <Footer />
      </main>
    </>
  );
}

export default PetProfileLayout;
