import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchGetAllPosts, fetchGetFollowingPosts } from '@/common/fetch/post';
import { filterPost, filterPostsByDate, sortPostsByLikes } from '@/common/helpers/configurePosts';

import MorePostHint from './MorePostHint';
import PawkButton from './PawkButton';
import PostCard from './PostCard';

import type { RootState } from '@/common/redux/store';
import type { PostDataType } from '@/types';

// 貼文要過濾出 3 天內的與其他的
interface FilteredPostsType {
  recentPosts: PostDataType[];
  olderPosts: PostDataType[];
}

interface PropsType {
  all: PostDataType[];
  following: FilteredPostsType;
}

function Posts({ all, following }: PropsType) {
  const router = useRouter();
  const { userId, username } = useSelector((state: RootState) => state.userInfo);
  const [allPosts, setAllPosts] = useState(all);
  const [followingPosts, setFollowingPosts] = useState<FilteredPostsType>(following);

  // 取得追蹤的貼文
  const getFollowingPosts = async () => {
    if (!userId) {
      return;
    }

    const response = await fetchGetFollowingPosts(userId);
    const { data } = response;
    if (!data || !response.ok) {
      setFollowingPosts({ recentPosts: [], olderPosts: [] });
      return;
    }

    const { recentPosts, olderPosts } = filterPostsByDate(data);
    setFollowingPosts({ recentPosts, olderPosts });
  };

  // 取得全部貼文
  const getList = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await fetchGetAllPosts();
      const { data } = response;
      if (!data || !response.ok) {
        return;
      }

      // 過濾掉自己的貼文與已追蹤的人的貼文
      const { recentPosts } = followingPosts;
      if (!recentPosts || recentPosts.length === 0) {
        setAllPosts(sortPostsByLikes(data));
        return;
      }
      const filteredPosts = sortPostsByLikes(filterPost(data, recentPosts));

      setAllPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };

  // 沒 username 表示未完成註冊流程
  useEffect(() => {
    if (userId && !username) {
      router.push('/member/new/profile');
    }
  }, [userId, username]);

  useEffect(() => {
    getList();
  }, [followingPosts]);

  return (
    <div className='w-full max-w-[658px] border-x border-stroke bg-white px-8 pt-24'>
      <PawkButton getList={getFollowingPosts} />
      {/* 貼文列表 */}
      {followingPosts?.recentPosts?.length !== 0 && (
        <>
          <h2 className='mt-8 text-note'>動態消息</h2>{' '}
          <div className='my-4 flex flex-col gap-8'>
            {followingPosts?.recentPosts.map((data) => (
              <PostCard key={data.postId} data={data} getList={getFollowingPosts} />
            ))}
          </div>
          <MorePostHint />
        </>
      )}
      <h2 className='mt-8 text-note'>熱門貼文</h2>
      <div className='my-4 flex flex-col gap-8'>
        {allPosts?.map((post: PostDataType) => (
          <PostCard key={post.postId} data={post} getList={getList} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
