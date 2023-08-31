import { ThreadsTab, ProfileHeader } from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { profileTabs } from "@/constants";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { fetchUserById } from "@/lib/actions/user.actions";
import { User } from "@/types";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

const Profile = async ({ params }: Props) => {
  const { dbUser } = await useLoggedUser();

  const user: User = await fetchUserById(params.id);

  return (
    <section>
      <ProfileHeader data={user} type="User" />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
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
                    {user.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                accountId={user._id.toString()}
                type="User"
                loggedUserId={dbUser._id.toString()}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
