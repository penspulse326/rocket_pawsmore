import { fetchCreateMember } from '@/common/fetch/memberProfile';
import useToken from '@/common/hooks/useToken';
import { RootState } from '@/common/redux/store';
import { setUserInfo } from '@/common/redux/userInfoSlice';
import { SpeciesType } from '@/common/types/enums';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const data = [
  { name: SpeciesType[0], src: '/images/topic-dog.png' },
  { name: SpeciesType[1], src: '/images/topic-cat.png' },
  { name: SpeciesType[2], src: '/images/topic-rice.png' },
];

const SelectTopic = () => {
  const { token } = useToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, account, headShot, introduction, link } = useSelector(
    (state: RootState) => state.userInfo
  );
  const [selected, setSelected] = useState<SpeciesType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      alert('請先登入');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);

    const formData = {
      username,
      account,
      headShot,
      introduction,
      link,
      topic: selected,
    };

    const response = await fetchCreateMember(formData, token, headShot);
    if (!response.ok) {
      alert('新增失敗，請稍候再試');
      setIsLoading(false);
      return;
    }

    dispatch(setUserInfo(response.data));

    setIsLoading(false);
    router.push('/');
  };

  return (
    <section className='my-16'>
      <div>
        <h2 className='text-[32px]'>個人化推薦主題</h2>
        <h3 className='text-note'>我們精心為您挑選感興趣的主題，讓您的體驗更豐富。</h3>
      </div>
      <section className='mt-8'>
        {/* 主題選項 */}
        <div className='flex gap-8'>
          {data.map(({ name, src }, index) => (
            <button
              key={`${index}-${name}`}
              type='button'
              onClick={() => setSelected(SpeciesType[name as keyof typeof SpeciesType])}
              className='flex flex-col items-center gap-4 text-xl'
            >
              <div className='relative flex h-[158px] w-[158px] items-center justify-center overflow-hidden rounded-3xl border border-stroke'>
                <Image src={src} alt={name} priority={false} width={158} height={158} />
                {selected === SpeciesType[name as keyof typeof SpeciesType] && (
                  <div className='absolute flex h-full w-full items-center justify-center bg-[#333333aa]'>
                    <Image
                      src='/icons/icon-paw-white.svg'
                      alt='paw'
                      priority={false}
                      width={80}
                      height={80}
                      className='h-auto w-auto'
                    />
                  </div>
                )}
              </div>
              {name}
            </button>
          ))}
          <button
            type='button'
            onClick={() => setSelected(SpeciesType.其他)}
            className='flex flex-col items-center gap-4 text-xl'
          >
            <div className='relative flex h-[158px] w-[158px] items-center justify-center overflow-hidden rounded-3xl border border-stroke'>
              <Image
                src='/images/topic-other.svg'
                alt='topic-other'
                width={0}
                height={0}
                className='h-auto w-auto'
              />
              {selected === SpeciesType.其他 && (
                <div className='absolute flex h-full w-full items-center justify-center bg-[#333333aa]'>
                  <Image
                    src='/icons/icon-paw-white.svg'
                    alt='paw'
                    priority={false}
                    width={80}
                    height={80}
                    className='h-auto w-auto'
                  />
                </div>
              )}
            </div>
            其他
          </button>
        </div>
        <button
          type='button'
          disabled={selected === null}
          onClick={handleSubmit}
          className='mt-12 w-full rounded-full bg-primary py-2 text-xl font-semibold text-white'
        >
          確認
        </button>
        <div className='flex justify-end'>
          <Link href='/' className='mt-4 text-note underline'>
            略過此步驟
          </Link>
        </div>
      </section>
    </section>
  );
};

export default SelectTopic;
