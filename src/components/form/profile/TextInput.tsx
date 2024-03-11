import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import React, { forwardRef, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';

interface PropsType {
  name: string; // input name
  title: string; // input 上方的標題
  placeholder: string; // 輸入框提示
  maxLength?: number; // 最大字數
  message?: string; // 錯誤訊息
  star?: boolean; // 必填圖案
  isPwd?: boolean; // 是否為密碼
  onChange: () => void;
  onBlur: () => void;
}

const TextInput = forwardRef<HTMLInputElement, PropsType>(
  ({ name, title, placeholder, maxLength, message, star, isPwd, onChange, onBlur }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const borderStyle = message ? { border: '1px solid #F23030' } : {};

    return (
      <div className='flex w-full flex-col gap-1'>
        <h4 className='flex items-center justify-between'>
          <span>
            {title}
            {star && <span className='text-error'>*</span>}
          </span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <div
          style={borderStyle}
          className='flex w-full rounded-[10px] border border-stroke p-3 outline-0 focus:border-note'
        >
          <input
            ref={ref}
            name={name}
            type={isPwd && !showPassword ? 'password' : 'text'}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            onBlur={onBlur}
            style={borderStyle}
            className='w-full outline-none'
          />
          {isPwd &&
            (showPassword ? (
              <IconEye
                size={24}
                className='stroke-note hover:cursor-pointer'
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IconEyeClosed
                size={24}
                className='stroke-note hover:cursor-pointer'
                onClick={() => setShowPassword(true)}
              />
            ))}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
TextInput.defaultProps = {
  maxLength: 30,
  message: '',
  star: false,
  isPwd: false,
};

export default TextInput;
