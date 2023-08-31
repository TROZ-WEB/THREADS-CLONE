import CommunityCard from "@/components/cards/CommunityCard";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { Community } from "@/types";

const Community = async () => {
  await useLoggedUser();

  const result = await fetchCommunities({ searchString: "" });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No communities found.</p>
        ) : (
          result.communities.map((community: Community) => (
            <CommunityCard
              key={community._id.toString()}
              communityId={community._id.toString()}
              communityImage={community.image}
              communityName={community.name}
              communityUsername={community.username}
              communityBio={community.bio}
              communityMembers={community.members}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Community;
