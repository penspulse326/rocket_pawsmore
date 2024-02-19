import React, { useState, useContext } from "react";

import Image from "next/image";
import { IconHeartFilled, IconMessageCircle2Filled } from "@tabler/icons-react";

import PostView from "@/components/post/PostView";
import Mask from "@/components/hint/Mask";
import NoContent from "@/components/NoContent";

import { PostListContext } from "@/pages/pet/[petAccount]";
import handleFreezeScroll from "@/common/helpers/handleFreezeScroll";
import { PostDataType } from "@/types";

import { MediaType } from "@/types/enums";

const Posts: React.FC = () => {
  const postList = useContext(PostListContext);

  const [selectedPost, setSelectedPost] = useState<PostDataType>();
  const [isMaskOpen, setIsMaskOpen] = useState(false);

  const handleOpenPost = (post: PostDataType) => {
    setSelectedPost(post);
    setIsMaskOpen(true);
    handleFreezeScroll(true);
  };

  return (
    <>
      {postList ? (
        <section className="flex gap-4 flex-wrap mr-auto overflow-hidden">
          {postList.map((post, index) => {
            const { media, likes, mediaType, comments, postContent } = post;

            return (
              <div key={index}>
                <div
                  className="gallery-card relative z-0 w-[352px] h-[352px] rounded-[30px] overflow-hidden hover:cursor-pointer"
                  onClick={() => handleOpenPost(post)}
                >
                  {/* 圖片 */}
                  {mediaType === MediaType.image && (
                    <Image
                      alt={postContent}
                      className="w-full h-full  object-cover"
                      src={media}
                      width={352}
                      height={352}
                      priority={false}
                    />
                  )}
                  {/* 影片 */}
                  {mediaType === MediaType.video && (
                    <video
                      src={media}
                      controls={false}
                      className="w-full h-full object-cover"
                    ></video>
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
                  <ul className="overlay absolute top-0 -z-10 flex gap-x-4 justify-center items-center bg-black/50 w-full h-full text-white rounded-[30px]">
                    <li className="flex gap-x-1 items-center">
                      <IconHeartFilled size={26} />
                      <div>{likes?.length || 0}</div>
                    </li>
                    <li className="flex gap-x-1 items-center">
                      <IconMessageCircle2Filled size={26} />
                      <div>{comments?.length || 0}</div>
                    </li>
                  </ul>
                </div>
                {selectedPost && isMaskOpen && (
                  <Mask setIsOpen={setIsMaskOpen} maskType="post">
                    <PostView data={selectedPost} />
                  </Mask>
                )}
              </div>
            );
          })}
        </section>
      ) : (
        <section className="mx-auto">
          <NoContent />
        </section>
      )}
    </>
  );
};

export default Posts;
