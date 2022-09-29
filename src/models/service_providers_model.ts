import { Schema, model } from "mongoose";
import { IServiceProvider } from "../types/interfaces";

const ServiceProvidersSchema = new Schema<IServiceProvider>({
  uID: { type: Schema.Types.ObjectId, ref: "User" },
  // uID: { type: String },
  bio: { type: String, required: true },
  specialties: [{ type: String, required: true }],
  preferredServiceType: [
    {
      type: String,
      required: true,
      enum: ["online", "home", "office"],
      default: "online",
    },
  ],
  minSessionFee: { type: Number },
  maxSessionFee: { type: Number },

  documents: {
    type: {
      url: { type: String, required: true },
      name: { type: String, required: true },
      attType: { type: String, required: true },
    },
  },
  reviewerUIDs: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // reviewerUIDs: [{ type: String, required: true }],
  verificationStatus: {
    type: String,
    required: true,
    enum: ["notSubmitted", "pendingReview", "inReview", "verified", "rejected"],
    default: "notSubmitted",
  },
  verificationDate: { type: Date },
  verifiedByUID: { type: Schema.Types.ObjectId, ref: "User" },
  // verifiedByUID: { type: String },
});

ServiceProvidersSchema.virtual("url").get(function () {
  return "serviceProviders/" + this._id;
});

module.exports = model<IServiceProvider>(
  "ServiceProvider",
  ServiceProvidersSchema
);
