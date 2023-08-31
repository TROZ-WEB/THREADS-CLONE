import ThreadCard from "@/components/cards/ThreadCard";
import { PostCommentForm } from "@/components/forms";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { Thread } from "@/types";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const Thread = async ({ params }: Props) => {
  const { dbUser } = await useLoggedUser();

  if (!params.id) redirect("/");
  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id.toString()}
          thread={thread}
          loggedUserId={dbUser._id.toString()}
        />
      </div>

      <div className="mt-7">
        <PostCommentForm
          threadId={thread._id.toString()}
          currnetUserImg={dbUser.image}
          currentUserId={dbUser._id.toString()}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((comment: Thread) => (
          <ThreadCard
            key={comment._id.toString()}
            thread={comment}
            loggedUserId={dbUser._id.toString()}
          />
        ))}
      </div>
    </section>
  );
};

export default Thread;
