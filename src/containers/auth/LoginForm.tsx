import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fetchLogin } from '@/common/fetch/auth';
import useToken from '@/common/hooks/useToken';
import { errorText } from '@/common/lib/messageText';
import { setUserInfo } from '@/common/redux/userInfoSlice';
import PasswordInput from '@/components/form/profile/PasswordInput';
import TextInput from '@/components/form/profile/TextInput';
import Loading from '@/components/hint/Loading';

export interface LoginFormType {
  email: string;
  password: string;
}

function LoginForm() {
  const { updateUser } = useToken();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const dispatch = useDispatch();

  // React Hook Form
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormType>();

  const isBtnDisabled = !isValid || isLoading;

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setStatusCode(0); // 重置狀態 否則 react-hook-form 的 error 會被清空

    const response = await fetchLogin(data);

    setStatusCode(response.status);

    if (!response.ok) {
      return;
    }

    const { token, userId, username } = response.data;

    // username 不存在表示還沒新增個人資料
    if (!username) {
      router.push('/member/new/profile');
      return;
    }

    dispatch(setUserInfo(response.data));
    updateUser(token, userId);
    router.push('/');

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 錯誤訊息
  useEffect(() => {
    switch (statusCode) {
      case 400:
        setError('email', { message: errorText.EMAIL_NOT_EXIST });
        break;
      case 401:
        setError('email', { message: errorText.ALL_NOT_MATCH });
        break;
      case 500:
        setError('email', { message: errorText.UNKNOWN_ERROR });
        break;
      default:
        break;
    }
  }, [statusCode, setError]);

  return (
    <>
      <div className='flex flex-col gap-y-1'>
        <h2 className='text-[32px]'>歡迎回來！</h2>
        <h3 className='text-note'>讓我們繼續記錄美好時光！</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* Email */}
        <Controller
          name='email'
          control={control}
          rules={{
            required: errorText.REQUIRED,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
              message: errorText.EMAIL_INVALID,
            },
          }}
          render={({ field }) => (
            <TextInput
              title='Email'
              placeholder='輸入電子郵件地址'
              message={errors.email?.message}
              {...field}
            />
          )}
        />
        {/* 密碼 */}
        <div className='flex flex-col gap-1'>
          <Controller
            name='password'
            control={control}
            rules={{
              required: errorText.REQUIRED,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                message: errorText.PASSWORD_INVALID,
              },
            }}
            render={({ field }) => (
              <PasswordInput
                title='密碼'
                placeholder='輸入密碼'
                message={errors.password?.message}
                {...field}
              />
            )}
          />
          <Link href='/login' className='self-end text-primary'>
            忘記密碼？
          </Link>
        </div>
        <button
          type='submit'
          disabled={isBtnDisabled}
          className={`${isValid ? 'bg-primary' : 'bg-note'} mt-4 rounded-full py-3  text-white`}
        >
          登入
        </button>
      </form>
      <div className='flex justify-center gap-4'>
        還沒有帳號？
        <Link href='/signup' className='text-primary underline'>
          立刻加入
        </Link>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default LoginForm;
