import { Thread } from "@/types";
import mongoose, { model, Schema, Model } from "mongoose";

// Thread
//  -> Thread comment 1
//  -> Thread comment 2
//    -> Thread comment 1 in thread comment 2

const threadSchema: Schema = new Schema({
  text: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread: Model<Thread> =
  mongoose.models.Thread || model("Thread", threadSchema);

export default Thread;
