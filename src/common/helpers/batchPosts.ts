import { PostDataType } from '@/common/constants/types';

// 將貼文分成多個批次，每個批次 12 個
const batchPosts = (posts: PostDataType[], batchSize: number) => {
  if (!posts) {
    return [];
  }
  const batches = [];
  for (let i = 0; i < posts.length; i += batchSize) {
    batches.push(posts.slice(i, i + batchSize));
  }
  return batches;
};

export default batchPosts;
