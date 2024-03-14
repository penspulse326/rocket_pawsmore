import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { PetDataType } from '@/common/constants/types';
import { PetDataContext } from '@/containers/PetProfile';

function Companionship() {
  const router = useRouter();
  const { profile } = useContext(PetDataContext)!;

  const { adoptedDate, birthday, owner } = profile as PetDataType;
  const { userAccount, userName, userPhoto } = owner;

  const duration: number = adoptedDate
    ? moment().diff(moment(adoptedDate).format('YYYY-MM-DD'), 'days')
    : moment().diff(moment(birthday).format('YYYY-MM-DD'), 'days');

  const handleCheckUser = (prop: string) => {
    router.push(`/member/${prop}`);
  };

  return (
    <button
      className='flex w-full max-w-[272px] items-center justify-center gap-x-4 rounded-[30px] border border-stroke py-4 text-left'
      onClick={() => handleCheckUser(userAccount)}
      type='button'
    >
      <div className='h-12 w-12'>
        <Image
          className='h-full w-full rounded-[108px] object-cover'
          src={userPhoto || '/images/default-photo.svg'}
          priority
          width={48}
          height={48}
          alt={userName}
        />
      </div>
      <div>
        已和 <span className='font-bold'>{userName}</span> 相伴
        <br />
        {duration} 天
      </div>
    </button>
  );
}

export default Companionship;
