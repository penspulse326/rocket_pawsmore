import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fetchGetSpeciesPosts } from '@/common/fetch/post';
import Mask from '@/components/hint/Mask';
import PostView from '@/components/Post/PostView';
import { MediaType, SpeciesType } from '@/types/enums';

import type { PostDataType } from '@/types';

interface PropsType {
  posts: PostDataType[];
}

const speciesData = {
  [SpeciesType.狗]: {
    name: '狗',
    src: '/images/exp-dog.png',
  },
  [SpeciesType.貓]: {
    name: '貓',
    src: '/images/exp-cat.png',
  },
  [SpeciesType.倉鼠]: {
    name: '倉鼠',
    src: '/images/exp-rice.png',
  },
  [SpeciesType.其他]: {
    name: '其他',
    src: '/images/exp-more-lg.jpg',
  },
};

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

const Explore: React.FC<PropsType> = ({ posts }) => {
  const router = useRouter();
  const species: SpeciesType = Number(router.query.species);
  const [postBatches, setPostBatches] = useState<PostDataType[][]>(
    posts ? batchPosts(posts, 12) : []
  );
  const [isMaskOpen, setIsMaskOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostDataType>();

  const handleClickPost = (data: PostDataType) => {
    setIsMaskOpen(!isMaskOpen);
    setSelectedPost(data);
  };

  const getPosts = async () => {
    const response = await fetchGetSpeciesPosts(species);
    const { data } = response;
    setPostBatches(batchPosts(data, 12));
    const newSelectedPost = data.filter((post) => post.postId === selectedPost?.postId)[0];
    setSelectedPost(newSelectedPost);
  };

  useEffect(() => {
    getPosts();
  }, [species]);

  return (
    <>
      {/* 點擊彈出貼文 */}
      {isMaskOpen && (
        <Mask maskType='post' setIsOpen={setIsMaskOpen}>
          <PostView data={selectedPost!} getPost={getPosts} onClose={() => setIsMaskOpen(false)} />
        </Mask>
      )}
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
            <div key={batchIndex} className='grid grid-cols-3 gap-2'>
              {batch?.map((post, index) => (
                <button
                  type='button'
                  key={`${batchIndex}-${index}-${post.postId}`}
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
    </>
  );
};

export default Explore;
