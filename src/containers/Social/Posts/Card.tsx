import { IconHeart } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { MediaType } from '@/common/constants/types/enums';
import { fetchGetComment } from '@/common/fetch/comment';
import { fetchGetSinglePost } from '@/common/fetch/post';
import useToken from '@/common/hooks/useToken';
import CommentList from '@/components/comment/CommentList';
import InputComment from '@/components/comment/InputComment';
import LikeBtn from '@/components/post/LikeBtn';
import Menu from '@/components/post/PostMenu';
import PostView from '@/components/post/PostView';

import RecordCardTag from './RecordCardTag';

import type { CommentDataType, PostDataType } from '@/common/constants/types';
import type { RootState } from '@/common/redux/store';

interface PropsType {
  data: PostDataType;
  getList: () => void;
}

function Card({ data: initalData, getList }: PropsType) {
  const { token } = useToken();
  const { userId } = useSelector((state: RootState) => state.userInfo);
  const [data, setData] = useState<PostDataType>(initalData);
  const [comments, setComments] = useState<CommentDataType[]>([]);
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    userId: authorId,
    postId,
    petAccount,
    petPhoto,
    postContent,
    media,
    mediaType,
    likes,
    createDate,
    dailyRecordData,
    medicalRecordData,
    momentData,
  } = data;

  const isLiked = likes.some((like) => like.userId === userId);

  const getPost = async () => {
    const response = await fetchGetSinglePost(postId);
    if (response.ok) {
      setData(response.data);
    }
  };

  const getComments = async () => {
    const response = await fetchGetComment(postId);
    if (response.ok) setComments(response.data);
  };

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoDoubleClick = () => {
    videoRef.current?.pause();
    setIsMaskOpen(true);
  };

  useEffect(() => {
    getComments();
  }, [data]);

  // 自動播放影片
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      {
        threshold: 1, // 調整此值以更改觸發播放的時間
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className='flex flex-col gap-4 rounded-[32px] border border-stroke p-8'>
      <section className='relative'>
        {/* 遮罩 */}
        {isMaskOpen && (
          <PostView data={data} getPost={getPost} onClose={() => setIsMaskOpen(false)} />
        )}
        {/* 多媒體內容 */}
        <div className='relative aspect-square max-h-[528px] max-w-[528px] overflow-hidden rounded-[26px]'>
          {mediaType === MediaType.image && (
            <Image
              src={media}
              alt={petAccount}
              priority
              onClick={() => setIsMaskOpen(true)}
              fill
              sizes='100%'
              style={{ objectFit: 'cover' }}
              className='h-auto w-auto cursor-pointer'
            />
          )}
          {mediaType === MediaType.video && (
            <video
              ref={videoRef}
              src={media}
              autoPlay
              muted
              onClick={handleVideoToggle}
              onDoubleClick={handleVideoDoubleClick}
              className='h-full w-full cursor-pointer bg-black object-contain'
            />
          )}
          <RecordCardTag
            data={dailyRecordData || momentData || medicalRecordData || null}
            onClick={() => setIsMaskOpen(true)}
          />
        </div>
        {/* 按讚按鈕 */}
        <LikeBtn userId={userId} postId={postId} isLiked={isLiked} getPost={getPost} />
      </section>
      {/* 寵物資訊 */}
      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link
            href={`/pet/${petAccount}`}
            className='relative h-12 max-h-12 w-12 max-w-12 overflow-hidden rounded-full'
          >
            <Image
              src={petPhoto || '/images/default-photo.png'}
              alt={petAccount}
              fill
              sizes='100%'
              style={{ objectFit: 'cover' }}
              className='h-auto w-auto'
            />
          </Link>
          <Link href={`/pet/${petAccount}`} className='font-bold'>
            {petAccount}
          </Link>
          <span className='h-1 w-1 rounded-full bg-note' />
          <span
            className='tooltip text-note'
            data-tooltip={moment(createDate).format('YYYY-MM-DD HH:mm')}
          >
            {moment(createDate).fromNow()}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {/* 按讚數 */}
          <IconHeart fill='#808080' color='#808080' />
          <span className='text-note'>{likes.length}</span>
          {/* 開啟選單 */}
          <Menu
            postId={postId}
            isAuthor={userId === authorId}
            media={media}
            mediaType={mediaType}
            getList={getList}
            onClose={() => setIsMaskOpen(false)}
          />
        </div>
      </section>
      {/* 內文 */}
      <p className='line-clamp-2 overflow-hidden text-ellipsis whitespace-pre-wrap break-words '>
        {postContent}
      </p>
      {/* 留言 */}
      <CommentList
        from='postList'
        postId={postId}
        comments={comments}
        onClick={() => setIsMaskOpen(true)}
      />
      {token && <InputComment postId={postId} getComments={getComments} isEffect />}
    </div>
  );
}

export default Card;
