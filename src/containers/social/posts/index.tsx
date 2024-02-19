import { useEffect, useState } from "react";

import PawkBtn from "./PawkBtn";
import PostCard from "./PostCard";
import { fetchGetAllPosts } from "@/common/fetch/post";

import type { PostDataType } from "@/types";

const Posts: React.FC<{ initialList: PostDataType[] }> = ({ initialList }) => {
  const [list, setList] = useState(initialList || []);

  const handleGetList = async () => {
    try {
      const response = await fetchGetAllPosts();
      const data: PostDataType[] = response.data;

      setList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-start-4 col-span-6 mx-auto p-8 border-x border-stroke bg-white">
        <PawkBtn />
        <h2 className="mt-8 text-note">動態消息</h2>
        {/* 貼文列表 */}
        <div className="flex flex-col gap-8 mt-4">
          {list?.map((data) => (
            <PostCard key={data.postId} data={data} getList={handleGetList} />
          ))}
        </div>
        {/* <MorePostHint /> */}
      </div>
    </>
  );
};

export default Posts;
