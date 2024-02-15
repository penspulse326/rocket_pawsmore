import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";

import BtnPawk from "./Pawk";
import Card from "./Card";
import MorePostHint from "./MorePostHint";
import { fetchGetAllPosts } from "@/common/fetch/post";

import type { PostDataType } from "@/types";

const List: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.userInfo);
  const [list, setList] = useState<PostDataType[]>([]);

  useEffect(() => {
    handleGetList();
  }, [token]);

  const handleGetList = async () => {
    if (token) {
      try {
        const response = await fetchGetAllPosts(token);
        const data: PostDataType[] = response.data;
        const sortedList = data.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );
        setList(sortedList);
        console.log(sortedList);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
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
      <MorePostHint />
    </div>
  );
};

export default List;
