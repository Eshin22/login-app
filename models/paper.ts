import mongoose, { Schema, model, models } from "mongoose";

const paperSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection", // ✅ Reference the Collection model here
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "reviewed", "printed"],
      default: "draft",
    },
    reviewer: { type: String, default: "" },
    comments: { type: String, default: "" },
    reviewedAt: { type: Date },
    printedAt: { type: Date },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const Papers = models.Papers || model("Papers", paperSchema);
export default Papers;
