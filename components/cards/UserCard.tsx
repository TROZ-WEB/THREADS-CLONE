"use client";

import { User } from "@/types";
import Image from "next/image";
import { Button } from "../ui";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  userImage: string;
  userName: string;
  userUsername: string;
};

const UserCard = ({ userId, userImage, userName, userUsername }: Props) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={userImage}
          alt="Profile Picture"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{userName}</h4>
          <p className="text-small-medium text-gray-1">@{userUsername}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${userId}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
