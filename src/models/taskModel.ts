import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: false },
    deadline: { type: Date, required: false },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
