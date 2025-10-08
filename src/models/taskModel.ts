const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

module.exports = { Task };
