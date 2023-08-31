import { Community } from "@/types";
import mongoose, { model, Schema, Model } from "mongoose";

const communitySchema: Schema = new Schema({
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community: Model<Community> =
  mongoose.models.Community || model("Community", communitySchema);

export default Community;
