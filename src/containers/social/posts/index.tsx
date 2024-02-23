import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PawkBtn from "./PawkBtn";
import PostCard from "./PostCard";
import MorePostHint from "./MorePostHint";
import { filterPost } from "@/common/helpers/configurePosts";
import { fetchGetAllPosts, fetchGetFollowingPosts } from "@/common/fetch/post";

import type { RootState } from "@/common/redux/store";
import type { PostDataType } from "@/types";

interface PropsType {
  all: PostDataType[];
  following: PostDataType[];
}

const Posts: React.FC<PropsType> = ({ all, following }) => {
  const router = useRouter();
  const { userId, username } = useSelector(
    (state: RootState) => state.userInfo
  );
  const [allPosts, setAllPosts] = useState(all || []);
  const [followingPosts, setFollowingPosts] = useState<PostDataType[]>(
    following || []
  );

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

  // 有 userId 沒 username 表示未完成註冊流程
  useEffect(() => {
    if (userId && !username) {
      router.push("/member/new/profile");
      return;
    }

    getFollowingPosts();
  }, [userId, username]);

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
          {followingPosts?.map((data) => (
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
