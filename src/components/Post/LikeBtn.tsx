import { IconHeart } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

import { fetchCheckAuth } from '@/common/fetch/auth';
import { fetchLikePost } from '@/common/fetch/post';
import useToken from '@/common/hooks/useToken';

import type { RootState } from '@/common/redux/store';

interface PropsType {
  userId: number | null;
  postId: number;
  isLiked: boolean;
  getList?: () => void;
  getPost?: () => void;
}

const LikeBtn: React.FC<PropsType> = ({ postId, isLiked, getList, getPost }) => {
  const { token } = useToken();

  const btnStyle = isLiked ? '#FE6916' : '#EAEAEA';

  const handleLikeToggle = async () => {
    if (!token) {
      alert('請先登入');
      return;
    }

    const auth = await fetchCheckAuth(token);
    if (!auth.ok) {
      alert('登入狀態過期，請重新登入');
      return;
    }

    const response = await fetchLikePost(token, postId);
    if (!response.ok) {
      return;
    }
    getList && getList();
    getPost && getPost();
  };

  return (
    <button type='button' onClick={handleLikeToggle} className='absolute bottom-8 right-8'>
      <IconHeart
        size={70}
        fill={btnStyle}
        className='stroke-white stroke-1 drop-shadow-md filter duration-300'
      />
    </button>
  );
};

export default LikeBtn;
