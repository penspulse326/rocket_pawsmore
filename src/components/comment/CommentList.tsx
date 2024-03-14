import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CommentMenu from './CommentMenu';

import type { CommentDataType } from '@/common/constants/types';

interface PropsType {
  from: 'postList' | 'postView';
  postId: number;
  comments: CommentDataType[];
  getComments?: () => void;
  onClick?: () => void;
}

const CommentList: React.FC<PropsType> = ({
  from,
  postId,
  comments,
  getComments,
  onClick: handleClick,
}) => {
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(-1);

  if (from === 'postList' && handleClick) {
    return (
      <section>
        <ul>
          {comments.slice(0, 2).map(({ id, userAccount, commentContent }) => (
            <li key={`${id}-${userAccount}`}>
              <Link href={`/member/${userAccount}`} className='mr-4 font-bold'>
                {userAccount}
              </Link>
              <span>{commentContent}</span>
            </li>
          ))}
        </ul>
        {comments.length > 2 && (
          <button type='button' onClick={() => handleClick()} className='mt-1 text-note'>
            查看更多留言
          </button>
        )}
      </section>
    );
  }

  if (from === 'postView' && getComments) {
    return (
      <ul className='mt-8 flex flex-col gap-4'>
        {comments.map((comment: CommentDataType, index) => {
          const { id, userId, userPhoto, userAccount, commentContent, createDate } = comment;
          return (
            <li
              key={`${id}${userAccount}`}
              className='relative flex items-start gap-4'
              onMouseEnter={() => setHoveredCommentIndex(index)}
              onMouseLeave={() => setHoveredCommentIndex(-1)}
            >
              <Link
                href={`/member/${userAccount}`}
                className='relative h-8 w-8 shrink-0 overflow-hidden rounded-full'
              >
                <Image
                  src={userPhoto || '/images/default-photo.png'}
                  alt={userAccount}
                  priority={false}
                  fill
                  sizes='100%'
                  style={{ objectFit: 'cover' }}
                  className='h-auto w-auto'
                />
              </Link>
              <div className='mr-8 flex-grow'>
                <Link href={`/member/${userAccount}`} className='mr-2 font-bold'>
                  {userAccount}
                </Link>
                <span
                  className='tooltip text-note'
                  data-tooltip={moment(createDate).format('YYYY-MM-DD')}
                >
                  {moment(createDate).fromNow()}
                </span>
                <p>{commentContent}</p>
              </div>
              {hoveredCommentIndex === index && (
                <CommentMenu
                  postId={postId}
                  authorId={userId}
                  commentId={id}
                  getComments={getComments}
                />
              )}
            </li>
          );
        })}
      </ul>
    );
  }
};

export default CommentList;
