import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';

import Recommend from './Recommend';

const RightBar: React.FC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const focusStyle = {
    border: '4px solid #C5E5FF',
    backgroundColor: 'white',
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setIsFocus(true);
  };

  const handleSearch = () => {
    if (!keyword) {
      return;
    }
    setKeyword('');
    router.push(`/search/account?keyword=${keyword}`);
  };

  return (
    <aside
      style={{ height: 'calc(100vh - 64px)' }}
      className='sticky top-16 ml-8 mt-16 flex w-full max-w-[312px] flex-col gap-8 bg-white'
    >
      <section
        style={isFocus ? focusStyle : {}}
        className='mt-8 flex items-center gap-2 rounded-full border-[4px] bg-stroke px-8 py-4'
      >
        <input
          type='text'
          name='search'
          value={keyword}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='搜尋帳號名稱⋯⋯'
          className='w-full bg-transparent outline-none'
        />
        <button type='button' onClick={handleSearch}>
          <IconSearch size={24} />
        </button>
      </section>
      <Recommend />
      <section>
        <h2 className=' text-note'>探索</h2>
        <div className='mt-4 px-5 text-center'>
          <div className='flex gap-4'>
            <Link href='/explore/0' className=''>
              <Image
                src='/images/exp-dog.png'
                width={80}
                height={80}
                alt='explore dog'
                className='mb-2 aspect-square rounded-full object-cover'
              />
              <span>狗</span>
            </Link>
            <Link href='/explore/1'>
              <Image
                src='/images/exp-cat.png'
                width={80}
                height={80}
                alt='explore cat'
                className='mb-2 aspect-square rounded-full object-cover'
              />
              <span>貓</span>
            </Link>
            <Link href='/explore/2'>
              <Image
                src='/images/exp-rice.png'
                width={80}
                height={80}
                alt='explore cat'
                className='mb-2 aspect-square rounded-full object-cover'
              />
              <span>倉鼠</span>
            </Link>
          </div>
          <Link href='/explore/3' className='mt-4 flex flex-col items-center'>
            <Image
              src='/images/exp-more.png'
              width={188}
              height={80}
              alt='explore cat'
              className='mb-2'
            />
            <span>更多</span>
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default RightBar;
