import { UpdateAccountForm } from "@/components/forms";
import { fetchUserByClerkId } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-up");

  const dbUser = await fetchUserByClerkId(clerkUser.id);

  const userData = {
    clerkId: clerkUser.id,
    name: dbUser?.name || clerkUser.firstName || "",
    username: dbUser?.username || clerkUser.username || "",
    image: dbUser?.image || clerkUser.imageUrl,
    bio: dbUser?.bio || "",
    onboarded: true,
  };

  return (
    <main className="mx-auto max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <UpdateAccountForm user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
