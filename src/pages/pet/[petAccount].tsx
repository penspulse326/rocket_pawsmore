import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProfileCard from "@/components/petProfile/ProfileCard";
import ProfileGallery from "@/components/petProfile/ProfileGallery";
import Footer from "@/components/Footer";

import { PostDataType } from "@/types";

export const PostListContext = createContext<PostDataType[] | undefined>(
  undefined
);

const PetProfile: React.FC = () => {
  const [postList, setPostList] = useState<PostDataType[]>();

  const router = useRouter();
  const { petAccount } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${petAccount}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        const data = await response.json();
        setPostList(data.data);
      } catch (error) {}
    };
    petAccount && fetchPost();
  }, [petAccount]);

  return (
    <PostListContext.Provider value={postList}>
      <main className="flex flex-col gap-y-12 items-center mt-[64px]">
        <ProfileCard />
        <ProfileGallery />
        <Footer />
      </main>
    </PostListContext.Provider>
  );
};

export default PetProfile;
