import BtnPawk from "./BtnPawk";
import PostCard from "./PostCard";
import MorePostHint from "./MorePostHint";

const PostList: React.FC = () => {
  const testArr = [1, 2, 3];

  return (
    <div className="scrollbar-none col-span-6 p-8 border-x border-stroke bg-white overflow-y-scroll">
      <BtnPawk />
      <h2 className="mt-8 text-note">動態消息</h2>
      {/* 貼文列表 */}
      <div className="flex flex-col gap-8 mt-4">
        {/* 貼文卡片 */}
        {testArr.map((item, index) => (
          <PostCard key={new Date().getTime() + index} />
        ))}
      </div>
      <MorePostHint />
    </div>
  );
};

export default PostList;
