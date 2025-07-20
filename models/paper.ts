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
    driveLink: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "reviewed", "printed"],
      default: "draft",
    },
    reviewer: { type: String, default: "" },
    comments: [
      {
        reviewer: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    reviewLink: { type: String, default: "" },
    reviewCount: { type: Number, default: 0 },

    // ✅ Add this field to store teacher comments
    teacherComments: [
      {
        teacher: { type: String, default: "Teacher" }, // optional teacher name
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Paper = models.Paper || model("Paper", paperSchema);
export default Paper;
