import { useLoggedUser } from "@/hooks/useLoggedUser";
import { getActivity } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

const Activity = async () => {
  const { dbUser } = await useLoggedUser();

  const activity = await getActivity(dbUser._id.toString());

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((activity) => (
            <Link
              key={activity._id.toString()}
              href={`/thread/${activity.parentId}`}
            >
              <article className="activity-card">
                <Image
                  src={activity.author.image}
                  alt="Profile picture"
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {activity.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="no-result">No activity yet.</p>
        )}
      </section>
    </section>
  );
};

export default Activity;
