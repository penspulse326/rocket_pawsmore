import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/common/redux/store';
import { errorText } from '@/common/constants/messageText';
import { Controller, useForm } from 'react-hook-form';
import { MemberFormType } from '@/common/constants/types';
import UploadPhoto from '../form/profile/UploadPhoto';
import TextInput from '../form/profile/TextInput';
import { useEffect, useState } from 'react';
import { fetchCreateMember } from '@/common/fetch/memberProfile';
import { mediaDelete, mediaUpload } from '@/common/fetch/mediaManager';
import { setUserInfo } from '@/common/redux/userInfoSlice';
import BtnLoading from '../hint/BtnLoading';
import getMediaId from '@/common/helpers/getMediaId';
import { useRouter } from 'next/router';
import useToken from '@/common/hooks/useToken';

const Profile: React.FC = () => {
  const { token } = useToken();
  const router = useRouter();
  const { account, username, headShot, introduction, link } = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [initailPhoto, setInitailPhoto] = useState<string>('');

  const {
    handleSubmit,
    register,
    control,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<MemberFormType>();

  const rowsOfTextarea: number = introduction.split('\n').length;

  const handleUpdate = async (data: MemberFormType) => {
    if (isLoading || !token) return;
    setIsLoading(true);
    setStatusCode(0);

    const response = await fetchCreateMember(data, token, initailPhoto!);
    dispatch(setUserInfo(response.data));

    // 確定新增成功才做上傳雲端圖片
    if (!response.ok) {
      setIsLoading(false);
      setStatusCode(response.status);
      return;
    }

    // 請求上傳圖片，有傳入照片才執行
    if (data.headShot instanceof File) {
      try {
        const uploadResult = await mediaUpload(data.headShot, 'member');
        const imgUrl = uploadResult.secure_url;

        const response = await fetchCreateMember(data, token, imgUrl);
        if (!response.ok) {
          setIsLoading(false);
          setStatusCode(response.status);
          alert('更新失敗，請稍候再試');
          return;
        }

        dispatch(setUserInfo(response.data));

        // 如果原本有頭貼，就要刪除
        if (initailPhoto) {
          const mediaId = getMediaId(initailPhoto);
          await mediaDelete(mediaId, 'image');
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setStatusCode(500);
        return;
      }
    }

    alert('更新成功');
    setIsLoading(false);
  };

  useEffect(() => {
    reset({
      account,
      username,
      headShot: headShot || initailPhoto,
      introduction,
      link,
    });

    setInitailPhoto(headShot);
  }, [account, username, headShot, introduction, link, reset]);

  // 顯示錯誤訊息
  useEffect(() => {
    switch (statusCode) {
      case 400:
        setError('account', { message: errorText.ACCOUNT_USED });
        break;
      case 401:
        alert(errorText.LOGIN_AGAIN);
        router.push('/login');
        break;
      case 500:
        setError('account', { message: errorText.UNKNOWN_ERROR });
        break;
      default:
        break;
    }
  }, [statusCode]);

  return (
    <div className='flex max-w-[728px] flex-col gap-y-8'>
      <div className='text-xl'>個人檔案</div>
      {/* card container */}
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className='flex max-w-[728px] flex-col gap-y-12 rounded-[30px] border border-stroke p-8'
      >
        <div className='flex gap-x-12'>
          {/* 上傳照片 */}
          <div className='flex w-full max-w-[264px] flex-col gap-y-4'>
            <Controller
              control={control}
              name='headShot'
              render={({ field }) => (
                <UploadPhoto
                  {...field}
                  title='個人照片'
                  initialPhoto={initailPhoto || ''}
                  message={errors.headShot?.message}
                  onChange={(file) => field.onChange(file)}
                  setError={() => setError('headShot', { message: errorText.IMAGE_OVERSIZE })}
                  clearErrors={() => clearErrors('headShot')}
                />
              )}
            />
          </div>
          {/* 用戶資訊 */}
          <div className='flex w-full max-w-[352px] flex-col gap-y-4'>
            {/* 用戶帳號 */}
            <Controller
              name='account'
              control={control}
              defaultValue={account}
              rules={{
                required: errorText.REQUIRED,
                pattern: {
                  value: /^[a-zA-Z0-9]{1,}$/,
                  message: errorText.ACCOUNT_INVALID,
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  title='用戶帳號'
                  placeholder='設定您的用戶帳號，30字內以英數字組成'
                  maxLength={30}
                  message={errors.account?.message}
                  star={true}
                />
              )}
            />
            {/* 用戶名稱 */}
            <Controller
              name='username'
              control={control}
              defaultValue={username}
              rules={{ required: errorText.REQUIRED }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  title='用戶名稱'
                  placeholder='在個人檔案上顯示您的名稱'
                  maxLength={15}
                  message={errors.username?.message}
                  star={true}
                />
              )}
            />
            {/* 個人簡介 */}
            <div className='flex flex-col gap-1'>
              <h4 className='flex items-center justify-between'>
                <span>個人簡介</span>
              </h4>
              <textarea
                {...register('introduction')}
                name='introduction'
                placeholder='輸入個人簡介'
                defaultValue={introduction}
                rows={rowsOfTextarea}
                className='w-full overflow-hidden rounded-[10px] border border-stroke px-4 py-3 outline-note'
              />
            </div>
            {/* 外部連結 */}
            <Controller
              name='link'
              control={control}
              defaultValue={link}
              render={({ field }) => (
                <TextInput {...field} title='連結' placeholder='新增外部連結' />
              )}
            />
          </div>
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='flex min-h-[46px] w-full max-w-[240px] items-center justify-center self-center rounded-full bg-primary py-2 text-xl font-semibold text-white'
        >
          {isLoading ? <BtnLoading /> : '確定'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
