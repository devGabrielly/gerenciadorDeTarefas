// Correção do TS para utilizaçaõ do ES Modules (import/export)

import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);

module.exports = { Task };
