import { User as ClerkUser } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUserByClerkId } from "@/lib/actions/user.actions";
import { User } from "@/types";

export const useLoggedUser = async (): Promise<{
  clerkUser: ClerkUser;
  dbUser: User;
}> => {
  const clerkUser: ClerkUser | null = await currentUser();
  if (!clerkUser) redirect("/sign-up");

  // if user just sign-up, bdUser doesn't exist. It will be created after the onboarding form has been submitted.
  const dbUser: User | null = await fetchUserByClerkId(clerkUser.id);
  if (!dbUser || !dbUser.onboarded) redirect("/onboarding");

  return { clerkUser, dbUser };
};
