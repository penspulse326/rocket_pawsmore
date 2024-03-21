import { IconHeartFilled, IconMessageCircle2Filled } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react';

import { PostDataType } from '@/common/constants/types';
import { MediaType } from '@/common/constants/types/enums';
import { fetchGetPetPosts } from '@/common/fetch/post';
import Mask from '@/components/hint/Mask';
import NoContent from '@/components/NoContent';
import PostView from '@/components/post/PostView';
import { PetDataContext } from '@/containers/PetProfile';

function Posts() {
  const router = useRouter();
  const petAccount = router.query.petAccount as string;

  const { postList } = useContext(PetDataContext)!;

  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostDataType>();

  const fetchPost = async () => {
    const response = await fetchGetPetPosts(petAccount);
    const { data } = response;

    if (data) {
      const newSelectedPost = data.filter(
        (post: PostDataType) => post.postId === selectedPost?.postId
      )[0];
      setSelectedPost(newSelectedPost);
    }
    return data;
  };

  const handleOpenPost = (post: PostDataType) => {
    setIsMaskOpen(true);
    setSelectedPost(post);
  };

  return (
    <>
      {postList ? (
        <section className='mr-auto flex flex-wrap gap-4 overflow-hidden'>
          {postList.map((post) => {
            const { media, likes, mediaType, comments, postContent } = post;

            return (
              <div key={postContent}>
                <button
                  className='gallery-card relative z-0 h-[352px] w-[352px] overflow-hidden rounded-[30px]'
                  onClick={() => handleOpenPost(post)}
                  type='button'
                >
                  {/* 圖片 */}
                  {mediaType === MediaType.image && (
                    <Image
                      alt={postContent}
                      className='h-full w-full object-cover'
                      src={media}
                      width={352}
                      height={352}
                      priority={false}
                    />
                  )}
                  {/* 影片 */}
                  {mediaType === MediaType.video && (
                    <video controls={false} className='h-full w-full object-cover'>
                      <source src={media} />
                      <track kind='captions' />
                    </video>
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
                </button>
              </div>
            );
          })}
        </section>
      ) : (
        <section className='mx-auto'>
          <NoContent />
        </section>
      )}
      {/* expand post */}
      {isMaskOpen && (
        <Mask setIsOpen={setIsMaskOpen} maskType='post'>
          <PostView data={selectedPost!} getPost={fetchPost} onClose={() => setIsMaskOpen(false)} />
        </Mask>
      )}
    </>
  );
}

export default Posts;
