import { IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { MediaType } from '@/common/constants/types/enums';
import { fetchDeletePost } from '@/common/fetch/post';
import useToken from '@/common/hooks/useToken';
import { RootState } from '@/common/redux/store';

import Loading from '../hint/Loading';

interface PropsType {
  postId: number;
  isAuthor: boolean;
  media: string;
  mediaType: MediaType;
  getList: () => void;
  onClose: () => void;
}

const Menu: React.FC<PropsType> = ({
  postId,
  isAuthor,
  media,
  mediaType,
  getList,
  onClose: handleClose,
}) => {
  const { token } = useToken();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = async () => {
    if (!token) {
      alert('請先登入');
      return;
    }
    setIsLoading(true);

    await fetchDeletePost(token, postId, media, MediaType[mediaType] as 'image' | 'video');
    getList();
    handleClose();

    setIsLoading(false);
  };

  return (
    <>
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='relative cursor-pointer'>
        <IconDotsVertical />
        {isMenuOpen && (
          <ul className='shadow-custom absolute right-0 mt-2 w-28 rounded-3xl bg-white p-3'>
            <li>
              <button type='button' className='px-3 py-1'>
                複製連結
              </button>
            </li>
            <li>
              <button type='button' className='px-3 py-1 text-error'>
                檢舉貼文
              </button>
            </li>
            {isAuthor && (
              <li>
                <button type='button' onClick={handleDeletePost} className='px-3 py-1 text-error'>
                  刪除貼文
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Menu;
