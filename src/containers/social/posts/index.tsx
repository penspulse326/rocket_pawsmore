import { useEffect, useState } from "react";

import PawkBtn from "./PawkBtn";
import PostCard from "./PostCard";
import { fetchGetAllPosts, fetchGetFollowingPosts } from "@/common/fetch/post";

import type { PostDataType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import MorePostHint from "./MorePostHint";
import Loading from "@/components/hint/Loading";

const Posts: React.FC<{ initialList: PostDataType[] }> = ({ initialList }) => {
  const { userId } = useSelector((state: RootState) => state.userInfo);
  const [followingPosts, setFollowingPosts] = useState<PostDataType[]>([]);
  const [allList, setAllList] = useState(initialList || []);

  const getFollowingPosts = async () => {
    if (!userId) {
      return;
    }

    const response = await fetchGetFollowingPosts(userId);
    const data: PostDataType[] = response.data;
    setFollowingPosts(data);
  };

  const getList = async () => {
    try {
      const response = await fetchGetAllPosts();
      const data: PostDataType[] = response.data;

      const filteredPosts = data.filter((all) => {
        return !followingPosts.some((following) => {
          return all.postId === following.postId || all.userId === userId;
        });
      });

      console.log(filteredPosts);

      setAllList(filteredPosts);
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
        <h2 className="mt-8 text-note">動態消息</h2>
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
          {allList?.map((data) => (
            <PostCard key={data.postId} data={data} getList={getList} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
