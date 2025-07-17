import mongoose, { Schema, model, models } from "mongoose";

const ROLES = ["admin", "teacher", "reviewer", "unassigned"] as const;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ROLES,
      default: "unassigned",
    },
  },
  { timestamps: true }
);

// Clear the cached model to ensure schema updates are applied
if (models.User) {
  delete models.User;
}

const User = model("User", userSchema);
export default User;
