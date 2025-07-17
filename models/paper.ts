import mongoose, { Schema, model, models } from "mongoose";

const paperSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "reviewed", "printed"],
      default: "draft",
    },
    reviewer: { type: String, default: "" },
    comments: { type: String, default: "" },
    driveLink: { type: String, default: "" }, // ✅ Changed from pdfUrl to driveLink
    reviewedAt: { type: Date },
    printedAt: { type: Date },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// Clear the cached model to ensure schema updates are applied
if (models.Paper) {
  delete models.Paper;
}

const Paper = model("Paper", paperSchema);
export default Paper;
