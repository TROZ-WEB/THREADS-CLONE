import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Thread } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const Thread = async ({ params }: Props) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          thread={thread}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currnetUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((comment: Thread) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id || ""}
            thread={comment}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Thread;
