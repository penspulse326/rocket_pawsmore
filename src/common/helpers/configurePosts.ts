import { PostDataType } from '@/common/types';

export const filterPost = (allPosts: PostDataType[], followingPosts: PostDataType[]) => {
  const filteredPosts = allPosts.filter((all) => {
    if (!followingPosts) {
      return allPosts;
    }

    return !followingPosts?.some((following) => {
      return all.postId === following.postId;
    });
  });

  return filteredPosts;
};

export const filterPostsByDate = (posts: PostDataType[]) => {
  if (!posts) {
    return { recentPosts: [], olderPosts: [] };
  }

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const recentPosts: PostDataType[] = [];
  const olderPosts: PostDataType[] = [];

  posts?.forEach((post) => {
    const postDate = new Date(post.createDate);
    if (postDate > threeDaysAgo) {
      recentPosts.push(post);
    } else {
      olderPosts.push(post);
    }
  });

  return { recentPosts, olderPosts };
};

export const sortPostsByLikes = (posts: PostDataType[]) => {
  if (!posts) {
    return [];
  }
  return posts.sort((a, b) => {
    return b.likes.length - a.likes.length;
  });
};

export const sortPostsByDate = (posts: PostDataType[]) => {
  if (!posts) {
    return [];
  }
  return posts.sort((a, b) => {
    if (a.createDate > b.createDate) return -1;
    if (a.createDate < b.createDate) return 1;
    return 0;
  });
};
