import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { debounce } from "lodash";

import Image from "next/image";
import moment from "moment";
import { IconDotsVertical } from "@tabler/icons-react";

import Mask from "../hint/Mask";
import NetworkList from "./NetworkList";
import AlertCard from "../hint/AlertCard";

import { PostListContext } from "@/pages/pet/[petAccount]";
import getPetAge from "@/common/helpers/getPetAge";
import getPetSpecies from "@/common/helpers/getPetSpecies";
import handleFreezeScroll from "@/common/helpers/handleFreezeScroll";

import { RootState } from "@/common/redux/store";
import { PetDataType, UserListDataType } from "@/types";

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const { petAccount } = router.query;

  const postList = useContext(PostListContext);
  const [data, setData] = useState<PetDataType | undefined>();

  const [isMyPet, setIsMyPet] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const userInfo = useSelector((state: RootState) => state.userInfo);
  const petList = useSelector((state: RootState) => state.petList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pet/profile/${petAccount}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        const data = await response.json();

        setData(data.data);
        data.data.petsfollowers.find(
          (follower: UserListDataType) => userInfo.account === follower.account
        ) && setIsFollowing(true);
      } catch (error) {}
    };
    petAccount && fetchData();
    petList.find((pet) => pet.petAccount === petAccount) && setIsMyPet(true);
  }, [petAccount, petList, isFollowing, userInfo]);

  if (!data) {
    return null;
  }
  const {
    adoptedDate,
    birthday,
    petName,
    breed,
    petGender,
    petIntro,
    link,
    petPhoto,
    petSpecies,
    petsfollowers,
    petId,
    owner,
  } = data;

  const handleFollow = debounce(async () => {
    try {
      const response = await fetch(`/api/follow/${petAccount}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (!response.ok) {
        throw new Error("failed");
      }
      if (userInfo.token !== "") {
        if (isFollowing) {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
        }
      }
    } catch (error) {}
  }, 500);

  const PetProfile = () => {
    const htmlIntro = petIntro.split("\n");
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
    const htmlLink = link && link.length > 43 ? link.slice(0, 41) + "⋯" : link;

    return (
      <div className="flex flex-col max-w-[368px] w-full gap-y-6">
        <ul className="flex flex-col gap-y-3">
          <ol>
            <li className="text-[32px]">{petName}</li>
            <li>@{petAccount}</li>
          </ol>
          <ol className="flex gap-x-2 text-note">
            <li>{getPetSpecies(petSpecies)}</li>
            <li>{breed}</li>
            <li>{petGender ? "女生" : "男生"}</li>
            <li>{getPetAge(birthday)}</li>
          </ol>
        </ul>
        <ul className="flex gap-x-4">
          <li>
            <span className="font-bold pr-1">{postList?.length || 0}</span>貼文
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              setIsDisplayed(!isDisplayed);
              handleFreezeScroll(true);
            }}
          >
            <span className="font-bold pr-1">{petsfollowers?.length || 0}</span>
            粉絲
          </li>
        </ul>
        <ol className="flex flex-col gap-y-2">
          <li>
            {htmlIntro.map((string, index) => (
              <React.Fragment key={index}>
                {string}
                {index !== htmlIntro.length - 1 && <br />}
              </React.Fragment>
            ))}
          </li>
          {link && (
            <li className="flex gap-x-1">
              {linkIcon}
              <a className="text-link underline" href={link} target="_blank">
                {htmlLink}
              </a>
            </li>
          )}
        </ol>
      </div>
    );
  };
  const Companionship = () => {
    const duration: number = adoptedDate
      ? moment().diff(moment(adoptedDate).format("YYYY-MM-DD"), "days")
      : moment().diff(moment(birthday).format("YYYY-MM-DD"), "days");

    const { userAccount, userName, userPhoto } = owner;

    const handleCheckUser = (account: string) => {
      router.push(`/member/${account}`);
    };
    return (
      <div
        className="flex gap-x-4 justify-center items-center border border-stroke rounded-[30px] max-w-[272px] w-full py-4 hover:cursor-pointer"
        onClick={() => handleCheckUser(userAccount)}
      >
        <div className="w-12 h-12">
          <Image
            className="rounded-[108px] w-full h-full object-cover"
            src={userPhoto || "/images/default-photo.svg"}
            width={48}
            height={48}
            alt="owner avatar"
          />
        </div>
        <div>
          已和 <span className="font-bold">{userName}</span> 相伴
          <br />
          {duration} 天
        </div>
      </div>
    );
  };

  const Button = () => {
    const [isShown, setIsShown] = useState(false);
    const [buttonText, setButtonText] = useState("追蹤中");

    const handleEditPet = (petId: number) => {
      router.push(`/user_dashboard/edit_pet/${petId}`);
    };

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
            檢舉寵物檔案
          </button>
          {isAlertShown && (
            <Mask setIsOpen={setIsAlertShown} maskType="report">
              <AlertCard
                setIsDisplayed={setIsAlertShown}
                cardType="reportPet"
              />
            </Mask>
          )}
        </>
      );
    };

    return (
      <>
        {isMyPet ? (
          <button
            className="w-full bg-primary text-white rounded-[300px] py-2"
            type="button"
            onClick={() => handleEditPet(petId)}
          >
            編輯寵物檔案
          </button>
        ) : (
          <div className="flex gap-x-[15px] items-center w-full relative">
            <button
              className={`max-w-[157px] w-full rounded-[300px] py-2 ${
                isFollowing
                  ? "border border-stroke hover:border-error hover:text-error hover:bg-error/10"
                  : "bg-primary text-white"
              }`}
              type="button"
              onClick={() => {
                if (isFollowing) {
                  setIsAlertShown(!isAlertShown);
                  handleFreezeScroll(true);
                } else if (userInfo.token) {
                  handleFollow();
                }
              }}
              onMouseOver={() => setButtonText("取消追蹤")}
              onMouseOut={() => setButtonText("追蹤中")}
            >
              {isFollowing ? buttonText : "追蹤"}
            </button>
            <button
              className="max-w-[157px] w-full border border-stroke rounded-[300px] py-2"
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
      </>
    );
  };
  return (
    <section className="flex flex-col gap-y-8 w-full max-w-[696px] mt-12">
      {/* photo & pet data */}
      <div className="flex gap-x-[56px]">
        <div className="w-[272px] h-[272px]">
          <Image
            className="rounded-[30px] w-full h-full object-cover"
            src={petPhoto || "/images/default-photo.svg"}
            width={272}
            height={272}
            alt="pet avatar"
          />
        </div>
        <PetProfile />
      </div>
      {/* owner & edit button */}
      <div className="flex items-center gap-x-[56px]">
        <Companionship />
        <Button />
      </div>
      {/* show fans list */}
      {isDisplayed && (
        <Mask setIsOpen={setIsDisplayed} maskType="fans">
          <NetworkList
            type="follower"
            isClosed={isDisplayed}
            setIsClosed={setIsDisplayed}
            userList={petsfollowers}
          />
        </Mask>
      )}
      {isAlertShown && (
        <Mask setIsOpen={setIsAlertShown} maskType="fans">
          <AlertCard
            setIsDisplayed={setIsAlertShown}
            cardType="unFollow"
            handleUnFollow={handleFollow}
          />
        </Mask>
      )}
    </section>
  );
};

export default ProfileCard;
