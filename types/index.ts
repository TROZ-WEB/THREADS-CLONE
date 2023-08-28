export type User = {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
};

export type Author = {
  name: string;
  image: string;
  id: string;
};

export type Community = {
  name: string;
  image: string | null;
  id: string;
};

export type Thread = {
  _doc: Thread;
  _id: string;
  parentId: string | null;
  text: string;
  author: Author;
  community: Community;
  createdAt: string;
  children: {
    author: {
      image: string;
    };
  }[];
};
