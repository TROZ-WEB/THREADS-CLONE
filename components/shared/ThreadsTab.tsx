import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { Thread } from "@/types";

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserThreads(accountId);
  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: Thread) => {
        var newThread: Thread;
        accountType === "User"
          ? (newThread = {
              ...thread._doc,
              author: {
                name: result.name,
                image: result.image,
                id: result.id,
              },
            })
          : (newThread = {
              ...thread._doc,
              author: {
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              },
            });
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            thread={newThread}
          />
        );
      })}
    </section>
  );
};

export default ThreadsTab;
