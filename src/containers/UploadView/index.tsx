import { IconChevronLeft, IconMedal, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AddPostType, CardUnionDataType } from '@/common/constants/types';
import { MediaType, RecordCardType } from '@/common/constants/types/enums';
import { mediaUpload } from '@/common/fetch/mediaManager';
import { fetchAddPost } from '@/common/fetch/post';
import useToken from '@/common/hooks/useToken';
import PetSelect from '@/components/petInfo/PetSelect';

import Loading from '../../components/hint/Loading';
import Mask from '../../components/hint/Mask';
import List from '../../components/milestone/List';
import CardData from '../../components/post/CardData';

import UploadInput from './UploadInput';

interface PropsType {
  onClose: () => void;
  card?: CardUnionDataType;
  petId?: number;
}

function UploadView({ onClose, card, petId }: PropsType) {
  const { token } = useToken();
  const router = useRouter();

  // 表單相關
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [postContent, setPostContent] = useState('');

  // 寵物相關
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);

  // 提示
  const [isLoading, setIsLoading] = useState(false);
  const isBtnDisabled = !file || !postContent || !selectedPetId;

  // 處理檔案選擇
  const handleMediaChange = (media: File, type: MediaType) => {
    setMediaType(type);
    setFile(media);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!token || isLoading) {
      return;
    }
    event.preventDefault();
    setIsLoading(true);

    // 上傳圖片影片
    try {
      const uploadResponse = await mediaUpload(file!, 'post');
      if (!uploadResponse) {
        alert('上傳失敗，請稍後再試');
        return;
      }

      const mediaUrl = uploadResponse.secure_url;
      const data: AddPostType = {
        postContent,
        mediaType: mediaType!,
        media: mediaUrl,
      };

      // 確認是否有卡片資料
      if (card) {
        switch (RecordCardType[card.card]) {
          case '日常紀錄':
            data.dailyRecordId = card.cardId;
            break;
          case '醫療紀錄':
            data.medicalRecordId = card.cardId;
            break;
          case '重要時刻':
            data.momentId = card.cardId;
            break;
          default:
            break;
        }
      }

      const addPostResponse = await fetchAddPost(token, data, selectedPetId!);

      if (!addPostResponse.ok) {
        alert('上傳失敗，請稍後再試');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push('/');
    } catch (error) {
      alert('上傳失敗，請稍後再試');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Mask onClose={handleClose}>
        <form
          onSubmit={handleSubmit}
          className='mx-8 w-full max-w-[1041px] rounded-[30px] bg-white p-8'
        >
          {/* 新增貼文與關閉按鈕 */}
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>新增貼文</h2>
            <button type='button' onClick={handleClose}>
              <IconX size={40} stroke={1} />
            </button>
          </div>
          <div className='mt-4 flex gap-8'>
            {/* 檔案 */}
            <UploadInput mediaType={mediaType} onChange={handleMediaChange} />
            <section className='relative flex max-w-[469px] flex-grow flex-col'>
              {/* 文字輸入 */}
              <textarea
                name='postContent'
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className='scrollbar-none min-h-[150px] w-full flex-grow resize-none rounded-[30px] border border-stroke p-8 outline-note'
              />
              {/* 卡片資料 */}
              {card && <CardData data={card} />}
              <div className='mt-8 flex gap-8'>
                {/* 里程碑按鈕 */}
                {!card && (
                  <button
                    type='button'
                    className='flex-grow rounded-[30px] border border-stroke text-center'
                    onClick={() => {}}
                  >
                    <IconMedal size={48} className='mx-auto' />
                    <span className='mt-4 block text-note'>加上里程碑</span>
                  </button>
                )}
                <div
                  style={{
                    flexDirection: card ? 'row' : 'column',
                    maxWidth: card ? 'none' : '250px',
                  }}
                  className='flex w-full max-w-[250px] flex-grow gap-8'
                >
                  {/* 寵物列表 */}
                  <PetSelect petId={petId} setId={setSelectedPetId} />
                  {/* 送出 */}
                  <button
                    type='submit'
                    disabled={isBtnDisabled}
                    className={`${isBtnDisabled ? 'bg-note' : 'bg-primary'} w-full rounded-full py-3  text-xl font-bold text-white`}
                  >
                    Pawk!
                  </button>
                </div>
              </div>
              {/* 里程碑列表 */}
              {isMilestoneOpen && (
                <div className='absolute top-0 flex h-full w-full flex-col rounded-[30px] border border-stroke bg-white px-8'>
                  <div className='flex items-center py-6'>
                    <button
                      type='button'
                      className='absolute'
                      onClick={() => setIsMilestoneOpen(false)}
                    >
                      <IconChevronLeft stroke={1} size={40} />
                    </button>
                    <h3 className='w-full text-center text-xl'>加上里程碑</h3>
                  </div>
                  <ul className='scrollbar-none overflow-y-scroll pb-6'>
                    <List />
                  </ul>
                </div>
              )}
            </section>
          </div>
        </form>
      </Mask>
      {isLoading && <Loading />}
    </>
  );
}

UploadView.defaultProps = {
  card: null,
  petId: null,
};

export default UploadView;
