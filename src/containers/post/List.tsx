import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";

import BtnPawk from "./Pawk";
import PostCard from "./Card";
import MorePostHint from "./MorePostHint";
import { fetchGetAllPosts } from "@/common/fetch/post";

const List: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    handleGetList();
  }, [token]);

  const handleGetList = async () => {
    if (token) {
      try {
        const response = await fetchGetAllPosts(token);
        console.log(response);
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
      <div className="flex flex-col gap-8 mt-4">{/* 貼文卡片 */}</div>
      <MorePostHint />
    </div>
  );
};

export default List;
