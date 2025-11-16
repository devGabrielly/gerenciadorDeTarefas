import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    deadline: { type: Date, required: false },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
