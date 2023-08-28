"use client";

import { User } from "@/types";
import Image from "next/image";
import { Button } from "../ui";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  personType: string;
};

const UserCard = ({ user, personType }: Props) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={user.image}
          alt="Profile Picture"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{user.name}</h4>
          <p className="text-small-medium text-gray-1">@{user.username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${user.id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
