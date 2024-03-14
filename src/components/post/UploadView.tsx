import { IconChevronLeft, IconMedal, IconMovie, IconPhoto, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';

import { mediaUpload } from '@/common/fetch/mediaManager';
import { fetchAddPost } from '@/common/fetch/post';
import useToken from '@/common/hooks/useToken';
import { AddPostType, CardUnionDataType } from '@/common/constants/types';
import { MediaType, RecordCardType } from '@/common/constants/types/enums';

import AlertCard from '../hint/AlertCard';
import Loading from '../hint/Loading';
import Mask from '../hint/Mask';
import List from '../milestone/List';
import AccountList from '../petInfo/AccountList';

import CardData from './CardData';

const MAX_FILE_SIZE = 1024 * 1024 * 10;

interface UploadViewPropsType {
  onClose: () => void;
  getList?: () => void;
  card?: CardUnionDataType;
  petId?: number;
}

function UploadView({ onClose, getList, card, petId }: UploadViewPropsType) {
  const { token } = useToken();

  // 表單相關
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const [postContent, setPostContent] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>();

  // 寵物相關
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);

  // 提示
  const [isLoading, setIsLoading] = useState(false);
  const [isYetHint, setIsYetHint] = useState(false);

  // 按鈕樣式
  const isBtnDisabled = !file || !postContent || !selectedPetId;

  // 處理檔案選擇與預覽
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target.files?.[0];
    event.persist();

    setFile(file);

    //  限制大小
    if (inputFile) {
      if (inputFile.size > MAX_FILE_SIZE) {
        alert('檔案不能超過 10MB');
        return;
      }

      const previewUrl = URL.createObjectURL(inputFile);
      setPreview(previewUrl);

      const fileType = inputFile.type.split('/')[0];
      switch (fileType) {
        case 'image':
          setMediaType(MediaType.image);
          break;
        case 'video':
          setMediaType(MediaType.video);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      alert('請先登入');
      return;
    }
    event.preventDefault();

    setIsLoading(true);

    // 上傳圖片影片
    try {
      const uploadResult = await mediaUpload(file!, 'post');
      if (!uploadResult) {
        alert('上傳失敗，請稍後再試');
        return;
      }

      const mediaUrl = uploadResult.secure_url;
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

      const response = await fetchAddPost(token, data, selectedPetId!);
      if (!response.ok) {
        alert('上傳失敗，請稍後再試');
      }
    } catch (error) {
      alert('上傳失敗，請稍後再試');
      console.error('Error uploading the file:', error);
    }

    setIsLoading(false);
    setIsOpen(false);
    getList && getList();
  };

  const handleClose = () => {
    if (file || postContent) {
      setIsYetHint(true);
      return;
    }
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
            <label
              htmlFor='media'
              className='relative flex aspect-square max-h-[476px] max-w-[476px] flex-grow cursor-pointer items-center justify-center gap-8 overflow-hidden rounded-[30px] border border-stroke'
            >
              <input
                id='media'
                name='media'
                type='file'
                accept='.png, .jpg, .jpeg, .mp4, .mov'
                onChange={handleMediaChange}
                className='hidden'
              />
              <div className='flex items-center'>
                <IconPhoto size={24} />
                <span className='ml-2 text-note'>附上照片</span>
              </div>
              <div className='flex items-center'>
                <IconMovie size={24} />
                <span className='ml-2 text-note'>附上影片</span>
              </div>
              {/* 預覽 */}
              <div className='absolute h-full w-full'>
                {mediaType === MediaType.image && (
                  <Image src={preview} fill style={{ objectFit: 'cover' }} alt='preview' />
                )}
                {mediaType === MediaType.video && (
                  <video
                    src={preview}
                    autoPlay
                    controls
                    loop
                    muted
                    className='absolute h-full w-full'
                  />
                )}
              </div>
            </label>
            <section className='relative flex max-w-[469px] flex-grow flex-col'>
              {/* 文字輸入 */}
              <textarea
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
                  <AccountList petId={petId} setId={setSelectedPetId} />
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

export default UploadView;
