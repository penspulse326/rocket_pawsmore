import { PostDataType } from "@/types";

export const filterPost = (
  allPosts: PostDataType[],
  followingPosts: PostDataType[],
  userId: number
) => {
  const filteredPosts = allPosts.filter((all) => {
    if (!followingPosts) {
      return allPosts;
    }

    return !followingPosts?.some((following) => {
      return all.postId === following.postId || all.userId === userId;
    });
  });

  return filteredPosts;
};

export const sortPosts = (posts: PostDataType[]) => {
  return posts.sort((a, b) => {
    return b.likes.length - a.likes.length;
  });
};
