import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Image from "next/image";
import { IconHeartFilled, IconMessageCircle2Filled } from "@tabler/icons-react";

import NoContent from "@/components/NoContent";

import { RootState } from "@/common/redux/store";
import { PostDataType } from "@/types";

const Posts: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [post, setPost] = useState<PostDataType[] | undefined>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        const data = await response.json();
        setPost(data.data);
      } catch (error) {}
    };
    fetchPost();
  }, [userInfo.token, id]);

  return (
    <>
      {post ? (
        <section className="flex gap-4 flex-wrap mr-auto">
          {post.map((value, index) => {
            return (
              <div
                className="gallery-card relative w-[352px] h-[352px] z-0"
                key={index}
              >
                <Image
                  className="w-full h-full rounded-[30px] object-cover"
                  src={value.media}
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
                    <div>4</div>
                  </li>
                  <li className="flex gap-x-1 items-center">
                    <IconMessageCircle2Filled size={26} />
                    <div>1</div>
                  </li>
                </ul>
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
