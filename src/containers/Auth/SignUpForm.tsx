import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fetchLogin, fetchSignup } from '@/common/fetch/auth';
import useToken from '@/common/hooks/useToken';
import { errorText } from '@/common/lib/messageText';
import { setUserInfo } from '@/common/redux/userInfoSlice';
import TextInput from '@/components/form/profile/TextInput';
import SubmitButton from '@/components/form/SubmitButton';
import Loading from '@/components/hint/Loading';

import type { LoginFormType } from './LoginForm';

interface SignUpFormType extends LoginFormType {
  checkPassword: string;
}

function SignUpForm() {
  const { updateUser } = useToken();
  const router = useRouter();
  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // React Hook Form
  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpFormType>();

  // 用 watch 來監聽密碼的值
  const watchedPassword = watch('password');

  const handleSignUp = async (data: SignUpFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    const { email, password } = data;
    const formData: LoginFormType = { email, password };

    const sigunpResponse = await fetchSignup(formData);

    setStatusCode(sigunpResponse.status);

    if (!sigunpResponse.ok) {
      return;
    }

    const loginResponse = await fetchLogin(formData);
    const { token, userId } = loginResponse.data;

    dispatch(setUserInfo(loginResponse.data));
    updateUser(token, userId);
    router.push('/member/new/profile');

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 錯誤訊息
  useEffect(() => {
    switch (statusCode) {
      case 409:
        setError('email', { message: errorText.EMAIL_USED });
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
      <div>
        <h2 className='text-[32px]'>註冊</h2>
        <h3 className='text-note'>一同開啟與毛孩相伴的精彩冒險！</h3>
      </div>
      <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col gap-4'>
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
              {...field}
              title='Email'
              placeholder='輸入電子郵件地址'
              message={errors.email?.message}
            />
          )}
        />
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
            <TextInput
              {...field}
              title='密碼'
              placeholder='輸入6個字以上英數字'
              isPwd
              message={errors.password?.message}
            />
          )}
        />
        <Controller
          name='checkPassword'
          control={control}
          rules={{
            required: errorText.REQUIRED,
            validate: (value) => value === watchedPassword || errorText.PASSWORD_NOT_MATCH,
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              title='確認密碼'
              placeholder='再次輸入密碼'
              isPwd
              message={errors.checkPassword?.message}
            />
          )}
        />
        <SubmitButton disable={!isValid}>註冊</SubmitButton>
      </form>
      <div className='flex justify-center gap-4'>
        已有帳號？
        <Link href='/login' className='text-primary underline'>
          登入
        </Link>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default SignUpForm;
