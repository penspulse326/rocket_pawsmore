import { useEffect, useState } from "react";

import PawkBtn from "./PawkBtn";
import PostCard from "./PostCard";
import { fetchGetAllPosts, fetchGetFollowingPosts } from "@/common/fetch/post";

import type { PostDataType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import MorePostHint from "./MorePostHint";
import Loading from "@/components/hint/Loading";
import { filterPost } from "@/common/helpers/configurePosts";

interface PropsType {
  all: PostDataType[];
  following: PostDataType[];
}

const Posts: React.FC<PropsType> = ({ all, following }) => {
  const { userId } = useSelector((state: RootState) => state.userInfo);
  const [followingPosts, setFollowingPosts] = useState<PostDataType[]>(
    following || []
  );
  const [allPosts, setAllPosts] = useState(all || []);

  const getFollowingPosts = async () => {
    if (!userId) {
      return;
    }

    const response = await fetchGetFollowingPosts(userId);
    const data: PostDataType[] = response.data;
    setFollowingPosts(data);
  };

  const getList = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await fetchGetAllPosts();
      const data = response.data;

      // 過濾掉自己的貼文與已追蹤的人的貼文
      const filteredPosts = filterPost(data, followingPosts, userId);
      setAllPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFollowingPosts();
  }, [userId]);

  useEffect(() => {
    getList();
  }, [followingPosts]);

  return (
    <>
      <div className="mx-auto px-8 pt-24 max-w-[658px] w-full border-x border-stroke bg-white">
        <PawkBtn />
        {userId && <h2 className="mt-8 text-note">動態消息</h2>}
        {/* 貼文列表 */}
        <div className="flex flex-col gap-8 my-4">
          {followingPosts.map((data) => (
            <PostCard
              key={data.postId}
              data={data}
              getList={getFollowingPosts}
            />
          ))}
        </div>
        {userId && <MorePostHint />}
        <h2 className="mt-8 text-note">熱門貼文</h2>
        <div className="flex flex-col gap-8 my-4">
          {allPosts?.map((post: PostDataType) => (
            <PostCard key={post.postId} data={post} getList={getList} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
