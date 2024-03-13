import { IconHeartFilled, IconMessageCircle2Filled } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react';

import { fetchGetPetPosts } from '@/common/fetch/post';
import handleFreezeScroll from '@/common/helpers/handleFreezeScroll';
import Mask from '@/components/hint/Mask';
import NoContent from '@/components/NoContent';
import PostView from '@/components/Post/PostView';
import { PetDataContext } from '@/pages/pet/[petAccount]';
import { PostDataType } from '@/types';
import { MediaType } from '@/types/enums';

const Posts: React.FC = () => {
  const router = useRouter();
  const petAccount = router.query.petAccount as string;

  const { postList } = useContext(PetDataContext)!;

  const [posts, setPosts] = useState<PostDataType[]>(postList || []);
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostDataType>();

  const getPosts = async () => {
    const response = await fetchGetPetPosts(petAccount);
    const { data } = response;
    setPosts(data);

    if (data) {
      const newSelectedPost = data.filter((post) => post.postId === selectedPost?.postId)[0];
      setSelectedPost(newSelectedPost);
    }
    return data;
  };

  const handleOpenPost = (post: PostDataType) => {
    setIsMaskOpen(true);
    setSelectedPost(post);
    handleFreezeScroll(true);
  };

  useEffect(() => {
    getPosts();
  }, [postList]);

  return (
    <>
      {posts ? (
        <section className='mr-auto flex flex-wrap gap-4 overflow-hidden'>
          {posts?.map((post, index) => {
            const { media, likes, mediaType, comments, postContent } = post;

            return (
              <div key={index}>
                <div
                  className='gallery-card relative z-0 h-[352px] w-[352px] overflow-hidden rounded-[30px] hover:cursor-pointer'
                  onClick={() => handleOpenPost(post)}
                >
                  {/* 圖片 */}
                  {mediaType === MediaType.image && (
                    <Image
                      alt={postContent}
                      className='h-full w-full  object-cover'
                      src={media}
                      width={352}
                      height={352}
                      priority={false}
                    />
                  )}
                  {/* 影片 */}
                  {mediaType === MediaType.video && (
                    <video src={media} controls={false} className='h-full w-full object-cover' />
                  )}
                  {/* milestone badge */}
                  {/* {value.hasMilestone ? (
                <Image
                  className="absolute bottom-5 left-5"
                  src="/test/milestone-1.svg"
                  width={74}
                  height={70}
                  alt="milestone badge"
                />
              ) : null} */}
                  {/* show favorite icon & comments */}
                  <ul className='overlay absolute top-0 -z-10 flex h-full w-full items-center justify-center gap-x-4 rounded-[30px] bg-black/50 text-white'>
                    <li className='flex items-center gap-x-1'>
                      <IconHeartFilled size={26} />
                      <div>{likes?.length || 0}</div>
                    </li>
                    <li className='flex items-center gap-x-1'>
                      <IconMessageCircle2Filled size={26} />
                      <div>{comments?.length || 0}</div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className='mx-auto'>
          <NoContent />
        </section>
      )}
      {isMaskOpen && (
        <Mask setIsOpen={setIsMaskOpen} maskType='post'>
          <PostView data={selectedPost!} getPost={getPosts} onClose={() => setIsMaskOpen(false)} />
        </Mask>
      )}
    </>
  );
};

export default Posts;
