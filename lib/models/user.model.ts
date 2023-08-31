import { User } from "@/types";
import mongoose, { model, Schema, Model } from "mongoose";

const userSchema: Schema = new Schema({
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  onboarded: { type: Boolean, default: false },
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User: Model<User> = mongoose.models.User || model("User", userSchema);

export default User;
