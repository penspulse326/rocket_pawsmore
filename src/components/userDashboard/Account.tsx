import React, { useState } from 'react';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import ErrorMessage from '../ErrorMessage';
import { ChangePassword } from '@/common/constants/formText';
import { errorText } from '@/common/constants/messageText';

const Account: React.FC = () => {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('123456');
  const [newPassword, setNewPassword] = useState('');

  const [toChangePassword, setToChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const ChangePasswordBtn = () => {
    const handleChangePassword = () => {
      setToChangePassword(true);
      setPassword('');
    };

    if (toChangePassword) {
      if (showPassword) {
        return (
          <IconEye
            size={24}
            color={'#808080'}
            className='absolute right-4 hover:cursor-pointer'
            onClick={() => setShowPassword(false)}
          />
        );
      } else {
        return (
          <IconEyeClosed
            size={24}
            color={'#808080'}
            className='absolute right-4 hover:cursor-pointer'
            onClick={() => setShowPassword(true)}
          />
        );
      }
    } else {
      return (
        <button
          className='absolute right-2 rounded-[30px] bg-primary px-4 py-1.5 text-white'
          type='button'
          onClick={handleChangePassword}
        >
          更改
        </button>
      );
    }
  };

  return (
    <div className='flex max-w-[416px] flex-col gap-y-8'>
      <div className='text-xl'>帳號資料</div>
      <div className='flex flex-col gap-y-12 rounded-[30px] border border-stroke p-8'>
        <form className='flex flex-col  gap-y-4'>
          {/* email */}
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='email'>
              電子郵件<span className='font-semibold text-error'>*</span>
            </label>
            <input
              type='email'
              id='email'
              value={email}
              className='rounded-[10px] bg-stroke px-4 py-3'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* password */}
          <div className='flex flex-col gap-y-1'>
            <div className='flex justify-between'>
              <label htmlFor='password'>
                密碼<span className='font-semibold text-error'>*</span>
              </label>
              <ErrorMessage>{errorText.PASSWORD_INVALID}</ErrorMessage>
            </div>
            <div className='relative flex items-center'>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                id='password'
                value={password}
                placeholder={toChangePassword ? ChangePassword.ENTER_PASSWORD : ''}
                className='w-full rounded-[10px] border border-stroke px-4 py-3'
                onChange={(e) => setPassword(e.target.value)}
              />
              <ChangePasswordBtn />
            </div>
          </div>
          {/* check password */}
          {toChangePassword && (
            <div className='flex flex-col gap-y-1'>
              <div className='flex justify-between'>
                <label htmlFor='checkPassword'>
                  確認密碼<span className='font-semibold text-error'>*</span>
                </label>
                <ErrorMessage>{errorText.PASSWORD_NOT_MATCH}</ErrorMessage>
              </div>
              <div className='relative flex items-center'>
                <input
                  type={`${showNewPassword ? 'text' : 'password'}`}
                  id='checkPassword'
                  value={newPassword}
                  placeholder={ChangePassword.DOUBLE_CHECK}
                  className='w-full rounded-[10px] border border-stroke px-4 py-3'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showNewPassword ? (
                  <IconEye
                    size={24}
                    color={'#808080'}
                    className='absolute right-4 hover:cursor-pointer'
                    onClick={() => setShowNewPassword(false)}
                  />
                ) : (
                  <IconEyeClosed
                    size={24}
                    color={'#808080'}
                    className='absolute right-4 hover:cursor-pointer'
                    onClick={() => setShowNewPassword(true)}
                  />
                )}
              </div>
            </div>
          )}
        </form>
        <button
          className='self-center rounded-[300px] bg-primary px-[104px] py-2 text-white'
          type='submit'
        >
          送出
        </button>
      </div>
    </div>
  );
};

export default Account;
