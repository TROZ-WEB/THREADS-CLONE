import { fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";
import { Community, User } from "@/types";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "../cards/CommunityCard";

type Props = {
  loggedUserId: string;
};

const RightSideBar = async ({ loggedUserId }: Props) => {
  const suggestedUsers = await fetchUsers({
    userId: loggedUserId,
    searchString: "",
    pageSize: 5,
  });

  const suggestedCommunities = await fetchCommunities({
    searchString: "",
    pageSize: 5,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      {suggestedCommunities.communities.length > 0 && (
        <div className="flex flex-1 flex-col justify-start">
          <div className="flex flex-col gap-6">
            <h3 className="text-heading4-medium text-light-1">
              Suggested communities
            </h3>
            {suggestedCommunities.communities.map((community: Community) => (
              <CommunityCard
                key={community._id.toString()}
                communityId={community._id.toString()}
                communityImage={community.image}
                communityName={community.name}
                communityUsername={community.username}
                communityBio={community.bio}
                communityMembers={community.members}
                isSmall
              />
            ))}
          </div>
        </div>
      )}
      {suggestedUsers.users.length > 0 && (
        <div className="flex flex-1 flex-col justify-start">
          <div className="flex flex-col gap-6">
            <h3 className="text-heading4-medium text-light-1">
              Suggested users
            </h3>
            {suggestedUsers.users.map((person: User) => (
              <UserCard
                key={person._id.toString()}
                userId={person._id.toString()}
                userImage={person.image}
                userName={person.name}
                userUsername={person.username}
                isSmall
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RightSideBar;
