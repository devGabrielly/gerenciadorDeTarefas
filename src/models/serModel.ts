const { Schema: UserSchema, model: userModel } = require("mongoose");

const userSchema = new UserSchema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = userModel("User", userSchema);

module.exports = { User };
