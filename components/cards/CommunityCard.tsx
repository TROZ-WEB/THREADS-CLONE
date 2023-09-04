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
  isSmall?: boolean;
};

function CommunityCard({
  communityId,
  communityImage,
  communityName,
  communityUsername,
  communityBio,
  communityMembers,
  isSmall,
}: Props) {
  return (
    <article
      className={`w-full rounded-lg bg-dark-3 ${
        isSmall ? "py-0 px-0" : "py-5 px-4 sm:w-96"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link
          href={`/communities/${communityId}`}
          className="flex items-center flex-wrap gap-3"
        >
          <div className="relative h-12 w-12">
            <Image
              src={communityImage}
              alt="community_logo"
              fill
              sizes="200px"
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-base-semibold text-light-1">{communityName}</h4>
            <p className="text-small-medium text-gray-1">
              @{communityUsername}
            </p>
          </div>
        </Link>
      </div>

      {!isSmall && (
        <>
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
        </>
      )}
    </article>
  );
}

export default CommunityCard;
