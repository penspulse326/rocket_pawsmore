import { IconDotsVertical } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, memo } from 'react';

import { RequestedUserInfoType } from '@/common/constants/types';
import AlertCard from '@/components/hint/AlertCard';
import Mask from '@/components/hint/Mask';
import NetworkList from '@/components/NetworkList';

interface PropsType {
  userData: RequestedUserInfoType | undefined;
  isMe: boolean;
  userAccount: string | string[] | undefined;
}

function Profile({ userData, isMe, userAccount }: PropsType) {
  const [showReport, setShowReport] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { name, headshot, introduction, link, following } = userData || {};

  const htmlIntro = introduction?.split('\n');
  const htmlLink = link && link.length > 35 ? `${link.slice(0, 33)}⋯` : link;

  const handleCloseAll = () => {
    setShowAlert(false);
    setShowReport(false);
  };

  const handleCloseList = () => {
    setShowFollowing(false);
  };

  const handleShowList = () => {
    setShowFollowing(true);
  };

  const Report = memo(function ReportComponent() {
    return (
      <>
        <button
          className='absolute -bottom-[61.5px] -right-[120px] rounded-3xl bg-white px-6 py-4 text-error shadow-[0_0_10px_0_rgba(0,0,0,0.15)] hover:cursor-pointer'
          type='button'
          onClick={() => setShowAlert(true)}
        >
          檢舉個人檔案
        </button>
        {showAlert && (
          <Mask onClose={handleCloseAll}>
            <AlertCard setIsDisplayed={setShowAlert} cardType='reportUser' />
          </Mask>
        )}
      </>
    );
  });

  return (
    <div className='flex w-full max-w-[320px] flex-col gap-y-8'>
      <div className='flex gap-x-4'>
        <div className='h-[128px] w-[128px]'>
          <Image
            src={headshot || '/images/default-photo.svg'}
            width={128}
            height={128}
            priority
            alt='user avatar'
            className='h-full w-full rounded-[14px] object-cover'
          />
        </div>
        <ul className='flex flex-col gap-y-4'>
          <ol>
            <li className='text-[32px]'>{name}</li>
            <li>@{userAccount}</li>
          </ol>
          <button
            className='flex gap-x-1 hover:cursor-pointer'
            onClick={handleShowList}
            type='button'
          >
            <span className='font-semibold'>{following?.length || 0}</span>
            追蹤中
          </button>
        </ul>
      </div>
      <div className='flex flex-col gap-y-2'>
        <div>
          {htmlIntro?.map((string, index) => (
            <React.Fragment key={`${string}`}>
              {string}
              {index !== htmlIntro.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {link && (
          <div className='flex gap-x-1'>
            <Image src='/icons/icon-link.svg' width={24} height={24} alt='link icon' />
            <a href={link} className='text-link underline' target='_blank' rel='noreferrer'>
              {htmlLink}
            </a>
          </div>
        )}
      </div>
      {isMe ? (
        <Link
          href='/user_dashboard?to=account'
          className='w-full rounded-full bg-primary py-2 text-center text-white'
        >
          編輯個人檔案
        </Link>
      ) : (
        <div className='relative flex items-center gap-x-4'>
          <button
            className='w-full rounded-full bg-primary py-2 text-center text-white'
            type='button'
          >
            發送訊息
          </button>
          <IconDotsVertical
            size={24}
            className='hover:cursor-pointer'
            onClick={() => setShowReport(!showReport)}
          />
          {showReport && <Report />}
        </div>
      )}
      {following && showFollowing && (
        <Mask onClose={handleCloseList}>
          <NetworkList
            type='following'
            isClosed={showFollowing}
            setIsClosed={setShowFollowing}
            userList={following}
          />
        </Mask>
      )}
    </div>
  );
}

export default Profile;
