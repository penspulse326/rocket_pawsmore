import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconDotsVertical } from "@tabler/icons-react";

import Footer from "@/components/Footer";
import AddPet from "@/components/AddPet";
import NoContent from "@/components/NoContent";
import Mask from "@/components/hint/Mask";
import AlertCard from "@/components/hint/AlertCard";

import { RootState } from "@/common/redux/store";
import getPetSpecies from "@/common/helpers/getPetSpecies";
import getPetAge from "@/common/helpers/getPetAge";
import { PetDataType } from "@/types";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { userAccount } = router.query;

  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [headShot, setHeadShot] = useState("");
  const [intro, setIntro] = useState("");
  const [link, setLink] = useState("");

  const [petList, setPetList] = useState<PetDataType[] | undefined>();
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${userAccount}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        const data = await response.json();

        setUsername(data.data.name);
        setUserId(data.data.userId);
        setHeadShot(data.data.headshot);
        setIntro(data.data.introduction);
        setLink(data.data.link);
      } catch (error) {}
    };

    const fetchPetList = async () => {
      try {
        const response = await fetch(`/api/pet/list/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        const data = await response.json();
        setPetList(data.data);
      } catch (error) {}
    };

    fetchData();
    if (userId !== "") {
      fetchPetList();
    }
    userInfo.account !== userAccount && setIsMe(false);
  }, [userInfo, userAccount, userId]);

  const Profile: React.FC = () => {
    const [isShown, setIsShown] = useState(false);

    const linkIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.0734 9.813L5.0154 11.871C4.17141 12.715 3.69727 13.8597 3.69727 15.0532C3.69727 16.2468 4.17141 17.3915 5.0154 18.2355C5.85938 19.0795 7.00407 19.5536 8.19765 19.5536C9.39122 19.5536 10.5359 19.0795 11.3799 18.2355L14.1219 15.492C14.6308 14.983 15.0103 14.3593 15.2283 13.6733C15.4463 12.9873 15.4966 12.259 15.3749 11.5496C15.2533 10.8402 14.9632 10.1702 14.529 9.59611C14.0949 9.02197 13.5294 8.56035 12.8799 8.25L12.0009 9.129C11.9117 9.2184 11.834 9.31869 11.7699 9.4275C12.2717 9.57175 12.7271 9.84447 13.0912 10.2187C13.4553 10.5929 13.7155 11.0557 13.8459 11.5612C13.9763 12.0668 13.9726 12.5976 13.835 13.1013C13.6974 13.6049 13.4308 14.064 13.0614 14.433L10.3209 17.175C9.75798 17.7379 8.99449 18.0542 8.1984 18.0542C7.40231 18.0542 6.63882 17.7379 6.0759 17.175C5.51298 16.6121 5.19673 15.8486 5.19673 15.0525C5.19673 14.2564 5.51298 13.4929 6.0759 12.93L7.2654 11.742C7.09757 11.1131 7.03273 10.4626 7.0734 9.813Z"
          fill="#0057FF"
        />
        <path
          d="M9.87834 7.00758C9.3694 7.51659 8.98999 8.14027 8.77195 8.82626C8.55392 9.51225 8.50363 10.2405 8.6253 10.95C8.74697 11.6594 9.03705 12.3293 9.4712 12.9035C9.90534 13.4776 10.4709 13.9392 11.1203 14.2496L12.2828 13.0856C11.7743 12.9492 11.3105 12.6813 10.9383 12.3089C10.566 11.9365 10.2984 11.4726 10.1622 10.964C10.026 10.4554 10.026 9.91985 10.1624 9.41125C10.2987 8.90265 10.5665 8.43889 10.9388 8.06658L13.6793 5.32458C14.2423 4.76166 15.0057 4.44541 15.8018 4.44541C16.5979 4.44541 17.3614 4.76166 17.9243 5.32458C18.4873 5.8875 18.8035 6.65099 18.8035 7.44708C18.8035 8.24317 18.4873 9.00666 17.9243 9.56958L16.7348 10.7576C16.9028 11.3876 16.9673 12.0401 16.9268 12.6881L18.9848 10.6301C19.8288 9.78609 20.303 8.64141 20.303 7.44783C20.303 6.25425 19.8288 5.10957 18.9848 4.26558C18.1409 3.42159 16.9962 2.94745 15.8026 2.94745C14.609 2.94745 13.4643 3.42159 12.6203 4.26558L9.87834 7.00758Z"
          fill="#0057FF"
        />
      </svg>
    );
    const htmlIntro = intro.split("\n");
    const htmlLink = link.length > 35 ? link.slice(0, 33) + "⋯" : link;

    const Report = () => {
      const [isAlertShown, setIsAlertShown] = useState(false);

      return (
        <>
          <button
            className="px-6 py-4 text-error bg-white rounded-3xl absolute -right-[120px] -bottom-[61.5px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)] hover:cursor-pointer"
            type="button"
            onClick={() => {
              setIsAlertShown(true);
              // setIsShown(false);
            }}
          >
            檢舉個人檔案
          </button>
          {isAlertShown && (
            <Mask setIsOpen={setIsAlertShown} maskType="report">
              <AlertCard
                setIsDisplayed={setIsAlertShown}
                cardType="reportUser"
              />
            </Mask>
          )}
        </>
      );
    };

    return (
      <div className="flex flex-col gap-y-8 max-w-[320px] w-full">
        <div className="flex gap-x-4">
          <div className="w-[128px] h-[128px]">
            <Image
              src={headShot || "/images/default-photo.svg"}
              width={128}
              height={128}
              alt="user avatar"
              className="rounded-[14px] w-full h-full object-cover"
            />
          </div>
          <ul className="flex flex-col gap-y-4">
            <ol>
              <li className="text-[32px]">{username}</li>
              <li>@{userAccount}</li>
            </ol>
            <li className="flex gap-x-1">
              <span className="font-semibold">463</span>追蹤中
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>
            {htmlIntro.map((string, index) => (
              <React.Fragment key={index}>
                {string}
                {index !== htmlIntro.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          {link && (
            <div className="flex gap-x-1">
              {linkIcon}
              <a href={link} className="text-link underline" target="_blank">
                {htmlLink}
              </a>
            </div>
          )}
        </div>
        {isMe ? (
          <Link
            href="/user_dashboard?to=account"
            className="bg-primary text-white rounded-full py-2 w-full text-center"
          >
            編輯個人檔案
          </Link>
        ) : (
          <div className="flex gap-x-4 items-center relative">
            <button
              className="bg-primary text-white rounded-full py-2 w-full text-center"
              type="button"
            >
              發送訊息
            </button>
            <IconDotsVertical
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setIsShown(!isShown)}
            />
            {isShown && <Report />}
          </div>
        )}
      </div>
    );
  };
  const PetList: React.FC = () => {
    const OwnList = () => {
      return (
        <div className="flex gap-4 flex-wrap">
          {petList &&
            petList.map((pet, index) => {
              const {
                petId,
                petName,
                petAccount,
                petSpecies,
                petGender,
                breed,
                birthday,
                petPhoto,
              } = pet;

              const handleCheckPet = (petAccount: string) => {
                router.push(`/pet/${petAccount}`);
              };
              return (
                <div
                  className="flex flex-col gap-y-4 p-4 max-w-[224px] w-full border border-stroke rounded-[30px] bg-white hover:cursor-pointer"
                  key={index}
                  onClick={() => handleCheckPet(petAccount)}
                >
                  <div className="w-[192px] h-[192px]">
                    <Image
                      src={petPhoto || "/images/default-photo.svg"}
                      width={192}
                      height={192}
                      priority
                      alt="pet avatar"
                      className="w-full h-full rounded-[30px] object-cover"
                    />
                  </div>
                  <ul className="flex flex-col gap-1">
                    <li>{petName}</li>
                    <li>@{petAccount}</li>
                    <ol className="text-note flex gap-x-2">
                      <li>{getPetSpecies(petSpecies)}</li>
                      <li>{breed}</li>
                      <li>{petGender ? "女生" : "男生"}</li>
                    </ol>
                    <li className="text-note mb-4">{getPetAge(birthday)}</li>
                  </ul>
                </div>
              );
            })}
        </div>
      );
    };
    return (
      <div className="flex flex-col gap-y-4 max-w-[704px] w-full">
        <div className="text-note">寵物檔案清單</div>
        {isMe ? (
          petList ? (
            <OwnList />
          ) : (
            <AddPet />
          )
        ) : petList ? (
          <OwnList />
        ) : (
          <NoContent />
        )}
      </div>
    );
  };
  return (
    <main className="mt-[112px] flex flex-col gap-y-16">
      <div className="flex gap-x-16 justify-center">
        <Profile />
        <PetList />
      </div>
      <Footer />
    </main>
  );
};

export default UserProfile;
