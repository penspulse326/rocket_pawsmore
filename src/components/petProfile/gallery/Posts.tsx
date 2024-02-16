import React, { useState, useContext } from "react";

import Image from "next/image";
import { IconHeartFilled, IconMessageCircle2Filled } from "@tabler/icons-react";

import PostView from "@/components/post/PostView";
import Mask from "@/components/hint/Mask";
import NoContent from "@/components/NoContent";

import { PostListContext } from "@/pages/pet/[petAccount]";
import handleFreezeScroll from "@/common/helpers/handleFreezeScroll";
import { PostDataType } from "@/types";

const Posts: React.FC = () => {
  const postList = useContext(PostListContext);

  const [selectedPost, setSelectedPost] = useState<PostDataType>();
  const [isMaskOpen, setIsMaskOpen] = useState(false);

  return (
    <>
      {postList ? (
        <section
          className="flex gap-4 flex-wrap mr-auto overflow-hidden"
          // tabIndex={0}
          // onBlur={() => handleFreezeScroll(false)}
        >
          {postList.map((post, index) => {
            const { media, likes } = post;

            return (
              <div key={index}>
                <div
                  className="gallery-card relative w-[352px] h-[352px] z-0 hover:cursor-pointer"
                  onClick={() => {
                    setSelectedPost(post);
                    setIsMaskOpen(true);
                    // handleFreezeScroll(true);
                  }}
                >
                  <Image
                    className="w-full h-full rounded-[30px] object-cover"
                    src={media}
                    width={352}
                    height={352}
                    alt="gallery photos"
                  />
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
                      <div>{likes.length}</div>
                    </li>
                    <li className="flex gap-x-1 items-center">
                      <IconMessageCircle2Filled size={26} />
                      <div>1</div>
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
