import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { Thread, User, Community } from "@/types";
import { fetchCommunityThreads } from "@/lib/actions/community.actions";

type Props = {
  accountId: string;
  type: "User" | "Community";
  loggedUserId: string;
};

const ThreadsTab = async ({ accountId, type, loggedUserId }: Props) => {
  let data: User | Community;

  switch (type) {
    case "Community":
      data = await fetchCommunityThreads(accountId);
      break;
    case "User":
      data = await fetchUserThreads(accountId);
      break;
  }

  if (!data) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {data.threads.map((thread: Thread) => {
        return (
          <ThreadCard
            key={thread._id.toString()}
            thread={thread}
            loggedUserId={loggedUserId}
          />
        );
      })}
    </section>
  );
};

export default ThreadsTab;
