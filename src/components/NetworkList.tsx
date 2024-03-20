import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { UserListDataType } from '@/common/constants/types';

interface PropsType {
  type: 'following' | 'follower';
  userList: UserListDataType[];
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CardContentDataType {
  type: string;
  TITLE: string;
  CONTENT: string;
}

function NetworkList({ type, userList, isClosed, setIsClosed }: PropsType) {
  const router = useRouter();

  const cardContent: CardContentDataType[] = [
    {
      type: 'follower',
      TITLE: '粉絲',
      CONTENT: '尚無粉絲',
    },
    {
      type: 'following',
      TITLE: '追蹤中',
      CONTENT: '尚無追蹤',
    },
  ];

  const selectedCard = cardContent.find((item) => item.type === type);

  const handleCheckUser = (account: string) => {
    if (type === 'follower') {
      router.push(`/member/${account}`);
    } else {
      router.push(`/pet/${account}`);
    }
  };

  const handleCloseCard = () => {
    setIsClosed(false);
  };

  return (
    <div className='flex h-full max-h-[427px] w-full max-w-[322px] flex-col gap-y-6 rounded-[32px] border border-stroke bg-white p-8'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold'>{selectedCard?.TITLE}</div>
        <IconX
          size={24}
          color='#808080'
          className='hover:cursor-pointer'
          onClick={handleCloseCard}
        />
      </div>
      <ul className='flex h-full max-h-[304px] flex-col gap-y-4 overflow-y-auto text-left'>
        {userList.length > 0 ? (
          userList.map((user) => {
            const { name, account, photo } = user;
            return (
              <li
                className='flex gap-x-4 hover:cursor-pointer'
                onClick={() => handleCheckUser(account)}
                key={account}
                aria-hidden='true'
              >
                <div className='h-12 w-12'>
                  <Image
                    className='h-full w-full rounded-[53.3px] object-cover'
                    src={photo || '/images/default-photo.svg'}
                    width={48}
                    height={48}
                    alt='avatar photo'
                  />
                </div>
                <ol>
                  <li>{name}</li>
                  <li>@{account}</li>
                </ol>
              </li>
            );
          })
        ) : (
          <div className='flex h-full flex-col items-center gap-y-4'>
            <Image src='/icons/icon-paw-gradient.svg' width={162} height={162} alt='no followers' />
            <span className='text-lg'>{selectedCard?.CONTENT}</span>
          </div>
        )}
      </ul>
    </div>
  );
}

export default NetworkList;
