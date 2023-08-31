"use server";

import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { Community as CommunityType } from "@/types";
import { connectToDB } from "../mongoose";

export async function createCommunity(
  clerkId: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  clerkUserId: string
): Promise<CommunityType> {
  try {
    connectToDB();

    // Find the user with the provided unique id
    const user = await User.findOne({ id: clerkUserId });

    if (!user) throw new Error("User not found");

    const newCommunity = new Community({
      clerkId,
      name,
      username,
      image,
      bio,
      createdBy: user._id, // Use the mongoose ID of the user
    });

    const createdCommunity = await newCommunity.save();

    // Update User model
    user.communities.push(createdCommunity._id);
    await user.save();

    return createdCommunity;
  } catch (error) {
    // Handle any errors
    console.error("Error creating community:", error);
    throw error;
  }
}

export async function fetchCommunityById(
  communityId: string
): Promise<CommunityType> {
  try {
    connectToDB();

    const community = await Community.findById(communityId).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    if (!community) throw new Error("Community not found");

    return community;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching community details:", error);
    throw error;
  }
}

export async function fetchCommunityThreads(
  communityId: string
): Promise<CommunityType> {
  try {
    connectToDB();

    const communityThreads = await Community.findById(communityId).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
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
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    if (!communityThreads) throw new Error("Community not found");

    return communityThreads;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching community threadss:", error);
    throw error;
  }
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}): Promise<{ communities: CommunityType[]; isNext: boolean }> {
  try {
    connectToDB();

    // Calculate the number of communities to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Community> = {};

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    // Create a query to fetch the communities based on the search and sort criteria.
    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    // Count the total number of communities that match the search criteria (without pagination).
    const totalCommunitiesCount = await Community.countDocuments(query);

    const communities = await communitiesQuery.exec();

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

export async function addMemberToCommunity(
  communityId: string,
  memberId: string
): Promise<CommunityType> {
  try {
    connectToDB();

    // Find the community by its unique id
    const community = await Community.findById(communityId);

    if (!community) throw new Error("Community not found");

    // Find the user by their unique id
    const user = await User.findById(memberId);

    if (!user) throw new Error("User not found");

    // Check if the user is already a member of the community
    if (community.members.includes(user._id))
      throw new Error("User is already a member of the community");

    // Add the user's _id to the members array in the community
    community.members.push(user._id);
    await community.save();

    // Add the community's _id to the communities array in the user
    user.communities.push(community._id);
    await user.save();

    return community;
  } catch (error) {
    // Handle any errors
    console.error("Error adding member to community:", error);
    throw error;
  }
}

export async function removeUserFromCommunity(
  clerkUserId: string,
  clerkCommunityId: string
): Promise<{ success: boolean }> {
  try {
    connectToDB();

    const userId = await User.findOne({ clerkId: clerkUserId }, { _id: 1 });
    const communityId = await Community.findOne(
      { clerkId: clerkCommunityId },
      { _id: 1 }
    );

    if (!userId) throw new Error("User not found");

    if (!communityId) throw new Error("Community not found");

    // Remove the user's _id from the members array in the community
    await Community.findByIdAndUpdate(communityId._id, {
      $pull: { members: userId._id },
    });

    // Remove the community's _id from the communities array in the user
    await User.findByIdAndUpdate(userId._id, {
      $pull: { communities: communityId._id },
    });

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from community:", error);
    throw error;
  }
}

export async function updateCommunityInfo(
  clerkCommunityId: string,
  name: string,
  username: string,
  image: string
): Promise<CommunityType> {
  try {
    connectToDB();

    // Find the community by its _id and update the information
    const updatedCommunity = await Community.findOneAndUpdate(
      { clerkId: clerkCommunityId },
      { name, username, image }
    );

    if (!updatedCommunity) throw new Error("Community not found");

    return updatedCommunity;
  } catch (error) {
    // Handle any errors
    console.error("Error updating community information:", error);
    throw error;
  }
}

export async function deleteCommunity(
  clerkCommunityId: string
): Promise<CommunityType> {
  try {
    connectToDB();

    // Find the community by its ID and delete it
    const deletedCommunity = await Community.findOneAndDelete({
      clerkId: clerkCommunityId,
    });

    if (!deletedCommunity) throw new Error("Community not found");

    // Delete all threads associated with the community
    await Thread.deleteMany({ community: deletedCommunity._id });

    // Find all users who are part of the community
    const communityUsers = await User.find({
      communities: deletedCommunity._id,
    });

    // Remove the community from the 'communities' array for each user
    const updateUserPromises = communityUsers.map((user) => {
      user.communities.splice(parseInt(deletedCommunity._id), 1);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCommunity;
  } catch (error) {
    console.error("Error deleting community: ", error);
    throw error;
  }
}
