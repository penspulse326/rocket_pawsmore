import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MediaType, SpeciesType } from '@/common/constants/types/enums';
import batchPosts from '@/common/helpers/batchPosts';
import PostView from '@/containers/PostView';

import { speciesData } from './data';

import type { PostDataType } from '@/common/constants/types';

interface PropsType {
  posts: PostDataType[];
}

function Explore({ posts }: PropsType) {
  // 取出 url
  const router = useRouter();
  const species: SpeciesType = Number(router.query.species);
  const postBatches = posts ? batchPosts(posts, 12) : [];

  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostDataType>();

  const handleClickPost = (data: PostDataType) => {
    setIsMaskOpen(true);
    setSelectedPost(data);
  };

  return (
    <>
      <div className='flex w-full max-w-[658px] flex-col border-x border-stroke bg-white px-8 py-24'>
        <h1 className='text-[32px]'>探索貼文</h1>
        <div className='relative mx-auto h-[144px] max-h-[144px] w-full max-w-[144px] overflow-hidden rounded-full'>
          <Image
            src={speciesData[species]?.src}
            alt='探索貼文'
            fill
            sizes='100%'
            className='h-auto w-auto object-cover'
          />
        </div>
        <h2 className='mb-8 mt-4 text-center text-2xl'>{speciesData[species]?.name}</h2>
        <section className='flex flex-col gap-2'>
          {postBatches?.map((batch, batchIndex) => (
            <div key={postBatches[batchIndex]?.[0]?.postId} className='grid grid-cols-3 gap-2'>
              {batch?.map((post, index) => (
                <button
                  type='button'
                  key={`${post.postId}`}
                  onClick={() => handleClickPost(post)}
                  className={`${
                    (index + 1) % 5 === 0 && index % 3 !== 2
                      ? 'col-span-2 row-span-2'
                      : 'col-span-1'
                  } rounded-[30px]`}
                >
                  <div className='aspect-square h-full w-full overflow-hidden rounded-[30px]'>
                    {post.mediaType === MediaType.image && (
                      <Image
                        src={post.media}
                        width={200}
                        height={200}
                        alt={post.petAccount}
                        className='h-full w-full object-cover'
                      />
                    )}
                    {post.mediaType === MediaType.video && (
                      <video
                        src={post.media}
                        autoPlay
                        muted
                        loop
                        className='h-full w-full bg-black object-cover'
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </section>
      </div>
      {isMaskOpen && (
        <PostView
          data={selectedPost}
          getPost={() => getPosts()}
          onClose={() => setIsMaskOpen(false)}
        />
      )}
    </>
  );
}

export default Explore;
