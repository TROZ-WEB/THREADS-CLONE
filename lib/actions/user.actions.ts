"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { Thread as ThreadType, User as UserType } from "@/types";
import { connectToDB } from "../mongoose";

export async function fetchUserByClerkId(
  clerkUserId: string
): Promise<UserType | null> {
  try {
    connectToDB();
    const user: UserType | null = await User.findOne({
      clerkId: clerkUserId,
    }).populate({
      path: "communities",
      model: Community,
    });

    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserById(userId: string): Promise<UserType> {
  try {
    connectToDB();

    const user: UserType | null = await User.findById(userId).populate({
      path: "communities",
      model: Community,
    });

    if (!user) throw new Error(`User not found`);

    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({
  clerkUserId,
  bio,
  name,
  path,
  username,
  image,
}: {
  clerkUserId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId: clerkUserId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserThreads(userId: string): Promise<UserType> {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const userWithThreads: UserType | null = await User.findById(
      userId
    ).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image _id",
        },
        {
          path: "community",
          model: Community,
          select: "name id image _id",
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id _id",
          },
        },
      ],
    });

    if (!userWithThreads) throw new Error("User not found");

    return userWithThreads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}): Promise<{ users: UserType[]; isNext: boolean }> {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      _id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users: UserType[] = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext: boolean = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string): Promise<ThreadType[]> {
  try {
    connectToDB();

    // Find all threads created by the user
    const userThreads: ThreadType[] = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds: ThreadType[] = userThreads.reduce(
      (acc, userThread) => acc.concat(userThread.children),
      [] as ThreadType[]
    );

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies: ThreadType[] = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
