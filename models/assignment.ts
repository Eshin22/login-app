import mongoose, { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema(
  {
    paperTitle: { type: String, required: true },
    reviewer: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
  },
  { timestamps: true }
);

const Assignment = models.Assignment || model("Assignment", assignmentSchema);
export default Assignment;
