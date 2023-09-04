import { formatDateString } from "@/lib/utils";
import { Thread } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { DeleteThread, LikeThread } from "../shared";

type Props = {
  loggedUserId: string;
  thread: Thread;
};

const ThreadCard = ({ thread, loggedUserId }: Props) => {
  const isComment: boolean = !!thread.parentId;

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex itens-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${thread.author._id.toString()}`}
              className="relative h-11 w-11"
            >
              <Image
                src={thread.author.image}
                alt="Profile image"
                fill
                sizes="200px"
                className="cursor-pointer rounded-full object-cover"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link
              href={`/profile/${thread.author._id.toString()}`}
              className="w-fit"
            >
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {thread.author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {thread.text}
            </p>
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <LikeThread
                  threadId={thread._id.toString()}
                  threadLikes={thread.likes.map((_id) => _id.toString())}
                  loggedUserId={loggedUserId}
                />
                <Link href={`/thread/${thread._id.toString()}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply icon"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {loggedUserId === thread.author._id.toString() && (
                  <DeleteThread
                    threadId={thread._id.toString()}
                    parentId={thread.parentId}
                    isComment={isComment}
                  />
                )}
              </div>
              <Link
                href={`/thread/${thread._id.toString()}`}
                className="flex items-end cursor-pointer mt-1 text-subtle-medium text-gray-1"
              >
                {!isComment && thread.children.length > 0 && (
                  <span>
                    {thread.children.length}{" "}
                    {thread.children.length === 1 ? "reply" : "replies"}
                  </span>
                )}
                {!isComment &&
                  thread.likes.length > 0 &&
                  thread.children.length > 0 && <span className="mx-2">-</span>}
                {!isComment && thread.likes.length > 0 && (
                  <span>
                    {thread.likes.length}{" "}
                    {thread.likes.length === 1 ? "like" : "likes"}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!isComment && (
        <div className="mt-5 flex items-center gap-1">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(thread.createdAt)}
          </p>

          {thread.community && (
            <Link
              href={`/communities/${thread.community._id.toString()}`}
              className="flex items-center gap-1"
            >
              <p className="text-subtle-medium text-gray-1">
                - {thread.community.name}
              </p>

              <div className="relative h-3.5 w-3.5">
                <Image
                  src={thread.community.image ? thread.community.image : ""}
                  alt={thread.community.name}
                  fill
                  sizes="100px"
                  className="ml-1 rounded-full object-cover"
                />
              </div>
            </Link>
          )}
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
