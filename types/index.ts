import { Document } from "mongoose";

export type User = Document & {
  clerkId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  onboarded: boolean;
  threads: Thread[];
  communities: Community[];
};

export type Thread = Document & {
  text: string;
  author: User;
  community: Community;
  createdAt: string;
  parentId: string;
  children: Thread[];
};

export type Community = Document & {
  clerkId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: User;
  threads: Thread[];
  members: User[];
};
