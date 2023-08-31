import { Community, User } from "@/types";
import Image from "next/image";

type Props = {
  data: User | Community;
  type: "User" | "Community";
};

const ProfileHeader = ({ data, type }: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={data.image}
              alt="Profile image"
              fill
              sizes="200px"
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {data.name}
            </h2>
            <p className="text-base-medium text-gray-1">@{data.username}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{data.bio}</p>
      <div className="mt-12 h-0.5 w-full bb-dark-3" />
    </div>
  );
};

export default ProfileHeader;
