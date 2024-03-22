import { IconHeart, IconMessageCircle } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MediaType } from '@/common/constants/types/enums';
import { fetchGetComment } from '@/common/fetch/comment';
import Mask from '@/components/hint/Mask';

import CommentList from '../../components/comment/CommentList';
import InputComment from '../../components/comment/InputComment';
import CardData from '../../components/post/CardData';
import LikeBtn from '../../components/post/LikeBtn';
import PostMenu from '../../components/post/PostMenu';

import type { CommentDataType, PostDataType } from '@/common/constants/types';
import type { RootState } from '@/common/redux/store';

interface PropsType {
  data: PostDataType;
  getPost: () => void;
  onClose: () => void;
}

function PostView({ data, getPost, onClose }: PropsType) {
  const { userId } = useSelector((state: RootState) => state.userInfo);
  const [postData, setPostData] = useState<PostDataType>(data);
  const [comments, setComments] = useState<CommentDataType[]>([]);

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
  } = postData;

  const isLiked = likes.some((like) => like.userId === userId);

  const getComments = async () => {
    const response = await fetchGetComment(postId);
    if (response.ok) setComments(response.data);
  };

  // 讀取留言
  useEffect(() => {
    if (data) {
      setPostData(data);
      getComments();
    }
  }, [data]);

  return (
    <Mask onClose={onClose}>
      <section className='flex h-full max-h-[594px] gap-8 rounded-[32px] bg-white p-8'>
        {/* 多媒體區 */}
        <section className='relative h-[530px] max-h-[530px] w-[530px] max-w-[530px] overflow-hidden rounded-[30px]'>
          {mediaType === MediaType.image && (
            <Image
              src={media}
              alt={petAccount}
              priority={false}
              fill
              sizes='100%'
              style={{ objectFit: 'cover' }}
              className='h-auto w-auto'
            />
          )}
          {mediaType === MediaType.video && (
            <video
              src={media}
              controls
              autoPlay
              className='h-full w-full bg-black object-contain'
            />
          )}
          {/* 按讚 */}
          <LikeBtn userId={userId} postId={postId} isLiked={isLiked} getPost={getPost} />
        </section>
        {/* 文字區 */}
        <section className='text-left'>
          <div className='mb-4 mt-1 flex justify-between'>
            {/* 個人資訊 */}
            <div className='flex items-center gap-2'>
              <Link
                href={`/pet/${petAccount}`}
                className='relative h-12 max-h-12 w-12 max-w-12 overflow-hidden rounded-full'
              >
                <Image
                  src={petPhoto || '/images/default-photo.png'}
                  alt={petAccount}
                  priority={false}
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
                className='tooltip text-nowrap text-note'
                data-tooltip={moment(createDate).format('YYYY-MM-DD HH:mm')}
              >
                {moment(createDate).fromNow()}
              </span>
            </div>
            {/* 選單 */}
            <PostMenu
              postId={postId}
              isAuthor={userId === authorId}
              media={media}
              mediaType={MediaType.image}
              getList={getPost || (() => {})}
              onClose={onClose}
            />
          </div>
          <section className='scrollbar-none h-full max-h-[353px] w-[411px] max-w-[411px] overflow-y-scroll'>
            {/* 貼文內容 */}
            <p className='mt-4 whitespace-pre-wrap break-words'>{postContent}</p>
            {/* 額外卡片資料 */}
            <CardData data={dailyRecordData || medicalRecordData || momentData || null} />
            {/* 留言列表 */}
            <CommentList
              from='postView'
              postId={postId}
              comments={comments}
              getComments={getComments}
            />
          </section>
          {/* 按讚數與留言數 */}
          <div className='my-4 flex gap-4 text-note'>
            <span className='flex items-center'>
              <IconHeart className='mr-2 fill-note stroke-note' />
              {likes.length}
            </span>
            <span className='flex items-center'>
              <IconMessageCircle className='mr-2 stroke-note' />
              {comments?.length}
            </span>
          </div>
          <InputComment postId={postId} getComments={getComments} />
        </section>
      </section>
    </Mask>
  );
}

export default PostView;
