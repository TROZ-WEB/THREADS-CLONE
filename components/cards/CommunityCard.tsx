import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "@/types";

type Props = {
  communityId: string;
  communityImage: string;
  communityName: string;
  communityUsername: string;
  communityBio: string;
  communityMembers: User[];
};

function CommunityCard({
  communityId,
  communityImage,
  communityName,
  communityUsername,
  communityBio,
  communityMembers,
}: Props) {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/communities/${communityId}`}
          className="relative h-12 w-12"
        >
          <Image
            src={communityImage}
            alt="community_logo"
            fill
            sizes="200px"
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/communities/${communityId}`}>
            <h4 className="text-base-semibold text-light-1">{communityName}</h4>
          </Link>
          <p className="text-small-medium text-gray-1">@{communityUsername}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1">{communityBio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${communityId}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {communityMembers.length > 0 && (
          <div className="flex items-center">
            {communityMembers.map((member) => (
              <Image
                key={member._id.toString()}
                src={member.image}
                alt={`user_${member.username}`}
                width={28}
                height={28}
                className="-ml-2 first:ml-0 rounded-full object-cover"
              />
            ))}
            {communityMembers.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {communityMembers.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
