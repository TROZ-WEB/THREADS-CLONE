import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/constants";
import { ThreadsTab, ProfileHeader } from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { fetchCommunityById } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { User } from "@/types";

type Props = {
  params: {
    id: string;
  };
};

const Community = async ({ params }: Props) => {
  const { dbUser } = await useLoggedUser();

  const community = await fetchCommunityById(params.id);

  return (
    <section>
      <ProfileHeader data={community} type="Community" />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                    {community?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              accountId={community._id.toString()}
              type="Community"
              loggedUserId={dbUser._id.toString()}
            />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {community.members.map((member: User) => {
                return (
                  <UserCard
                    key={member._id.toString()}
                    userId={member._id.toString()}
                    userImage={member.image}
                    userName={member.name}
                    userUsername={member.username}
                  />
                );
              })}
            </section>
          </TabsContent>
          {/* <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={community._id.toString()}
              accountType="Community"
            />
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  );
};

export default Community;
