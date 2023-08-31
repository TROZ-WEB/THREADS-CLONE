import ThreadCard from "@/components/cards/ThreadCard";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { fetchThreads } from "@/lib/actions/thread.actions";

export default async function Home() {
  const { dbUser } = await useLoggedUser();
  const result = await fetchThreads(1, 30);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length > 0 ? (
          result.threads.map((thread) => (
            <ThreadCard
              key={thread._id.toString()}
              thread={thread}
              loggedUserId={dbUser._id.toString()}
            />
          ))
        ) : (
          <p className="no-result">No threads found.</p>
        )}
      </section>
    </>
  );
}
