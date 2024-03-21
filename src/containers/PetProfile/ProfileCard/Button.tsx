import { IconDotsVertical } from '@tabler/icons-react';
import { DebouncedFunc } from 'lodash';
import { useRouter } from 'next/router';
import { useState, memo, useContext } from 'react';

import { PetDataType } from '@/common/constants/types';
import AlertCard from '@/components/hint/AlertCard';
import Mask from '@/components/hint/Mask';
import { PetDataContext } from '@/containers/PetProfile';

// 是否為自己的寵物、追蹤狀態的 useState hook
// 追蹤/取消追蹤 api
interface PropsType {
  token: string | undefined;
  isMyPet: boolean;
  isFollowing: boolean;
  handleFollow: DebouncedFunc<() => Promise<void>>;
}

function Button({ token, isMyPet, isFollowing, handleFollow }: PropsType) {
  const router = useRouter();

  const { profile } = useContext(PetDataContext)!;
  const { petId } = profile as PetDataType;

  const [showReport, setShowReport] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [buttonText, setButtonText] = useState('追蹤中');

  const handleEditPet = (prop: number) => {
    router.push(`/user_dashboard/edit_pet/${prop}`);
  };

  const handleFollowButton = () => {
    if (isFollowing) {
      setShowAlert(!showAlert);
    } else if (token) {
      handleFollow();
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  const Report = memo(function ReportComponent() {
    return (
      <>
        <button
          className='absolute -bottom-[61.5px] -right-[120px] rounded-3xl bg-white px-6 py-4 text-error shadow-[0_0_10px_0_rgba(0,0,0,0.15)]'
          type='button'
          onClick={() => setShowAlert(true)}
        >
          檢舉寵物檔案
        </button>
        {showAlert && (
          <Mask onClose={handleCloseAlert}>
            <AlertCard setIsDisplayed={setShowAlert} cardType='reportPet' />
          </Mask>
        )}
      </>
    );
  });

  return isMyPet ? (
    <button
      className='w-full rounded-[300px] bg-primary py-2 text-white'
      type='button'
      onClick={() => handleEditPet(petId)}
    >
      編輯寵物檔案
    </button>
  ) : (
    <div className='relative flex w-full items-center gap-x-[15px]'>
      <button
        className={`w-full max-w-[157px] rounded-[300px] py-2 ${
          isFollowing
            ? 'border border-stroke hover:border-error hover:bg-error/10 hover:text-error'
            : 'bg-primary text-white'
        }`}
        type='button'
        onClick={handleFollowButton}
        onMouseOver={() => setButtonText('取消追蹤')}
        onMouseOut={() => setButtonText('追蹤中')}
        onFocus={() => setButtonText('取消追蹤')}
        onBlur={() => setButtonText('追蹤中')}
      >
        {isFollowing ? buttonText : '追蹤'}
      </button>
      <button
        className='w-full max-w-[157px] rounded-[300px] border border-stroke py-2'
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
      {/* unFollow alert */}
      {showAlert && (
        <Mask onClose={handleCloseAlert}>
          <AlertCard
            setIsDisplayed={setShowAlert}
            cardType='unFollow'
            handleUnFollow={handleFollow}
          />
        </Mask>
      )}
    </div>
  );
}

export default Button;
