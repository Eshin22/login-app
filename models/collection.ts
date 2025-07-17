import mongoose, { Schema, model, models } from "mongoose";

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Collection = models.Collection || model("Collection", collectionSchema);
export default Collection;
