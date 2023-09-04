"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { likeThread } from "@/lib/actions/thread.actions";

type Props = {
  threadId: string;
  threadLikes: string[];
  loggedUserId: string;
};

function LikeThread({ threadId, threadLikes, loggedUserId }: Props) {
  const path = usePathname();

  return (
    <Image
      src={
        threadLikes.includes(loggedUserId)
          ? "/assets/heart-filled.svg"
          : "/assets/heart-gray.svg"
      }
      alt="like icon"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={async () => {
        await likeThread({ threadId, loggedUserId, path });
      }}
    />
  );
}

export default LikeThread;
