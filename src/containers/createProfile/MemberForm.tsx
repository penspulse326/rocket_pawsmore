import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/common/redux/userInfoSlice';

import TextInput from '@/components/form/profile/TextInput';
import UploadPhoto from '@/components/form/profile/UploadPhoto';
import { errorText } from '@/common/constants/messageText';
import BtnLoading from '@/components/hint/BtnLoading';
import { fetchCreateMember } from '@/common/fetch/memberProfile';
import { mediaUpload } from '@/common/fetch/mediaManager';

import type { MemberFormType } from '@/common/constants/types';
import useToken from '@/common/hooks/useToken';

const defaultValues = {
  account: '',
  username: '',
  headShot: null,
  introduction: '',
  link: '',
};

// 新增個人資料表單
const MemberForm: React.FC = () => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<MemberFormType>({ defaultValues });

  // 請求新增個人資料
  const handleCreateProfile = async (data: MemberFormType) => {
    if (!token) return;
    setIsLoading(true);
    setStatusCode(0);

    const response = await fetchCreateMember(data, token);
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
          alert('新增失敗，請稍候再試');
          return;
        }

        dispatch(setUserInfo(response.data));
        router.push('/member/new/pet');
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setStatusCode(500);
        return;
      }
    }

    setIsLoading(false);
    router.push('/member/new/pet');
  };

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
    <section className='my-16 flex w-full max-w-[728px] flex-col gap-4'>
      <div>
        <h2 className='text-[32px]'>建立個人資料</h2>
        <h3 className='text-note'>填寫您的個人資料，準備進入 Pawsmore 的世界。</h3>
      </div>
      <section className='rounded-[30px] border border-stroke p-8'>
        <form action='#' onSubmit={handleSubmit(handleCreateProfile)}>
          <div className='flex w-full gap-12'>
            {/* 上傳照片 */}
            <Controller
              name='headShot'
              control={control}
              render={({ field }) => (
                <UploadPhoto
                  {...field}
                  title='個人照片'
                  setError={() => setError('headShot', { message: errorText.IMAGE_OVERSIZE })}
                  clearErrors={() => clearErrors('headShot')}
                  message={errors.headShot?.message}
                  onChange={(file: File) => field.onChange(file)}
                />
              )}
            />
            <div className='flex flex-grow flex-col gap-4'>
              {/* 用戶帳號 */}
              <Controller
                name='account'
                control={control}
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
                  className='h-12 w-full overflow-hidden rounded-[10px] border border-stroke px-4 py-3 outline-note'
                />
              </div>
              {/* 外部連結 */}
              <Controller
                name='link'
                control={control}
                render={({ field }) => (
                  <TextInput {...field} title='連結' placeholder='新增外部連結' />
                )}
              />
            </div>
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='mt-12 flex min-h-[46px] w-full items-center justify-center rounded-full bg-primary py-2 text-xl font-semibold text-white'
          >
            {isLoading ? <BtnLoading /> : '建立個人資料'}
          </button>
        </form>
      </section>
    </section>
  );
};

export default MemberForm;
