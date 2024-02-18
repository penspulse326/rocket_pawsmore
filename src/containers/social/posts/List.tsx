import { useEffect, useState } from "react";

import BtnPawk from "./Pawk";
import Card from "./Card";
import { fetchGetAllPosts } from "@/common/fetch/post";
import Loading from "@/components/hint/Loading";

import type { PostDataType } from "@/types";

const List: React.FC = () => {
  const [list, setList] = useState<PostDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetList = async () => {
    try {
      const response = await fetchGetAllPosts();
      const data: PostDataType[] = response.data;

      setList(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="scrollbar-none col-span-6 p-8 border-x border-stroke bg-white overflow-y-scroll">
        <BtnPawk />
        <h2 className="mt-8 text-note">動態消息</h2>
        {/* 貼文列表 */}
        <div className="flex flex-col gap-8 mt-4">
          {/* 貼文卡片 */}
          {list?.map((data) => (
            <Card key={data.postId} data={data} getList={handleGetList} />
          ))}
        </div>
        {/* <MorePostHint /> */}
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default List;
