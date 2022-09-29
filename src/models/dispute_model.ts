import { Schema, model } from "mongoose";
import { IDispute } from "../types/interfaces";

const DisputeSchema = new Schema<IDispute>({
  sessionID: { type: Schema.Types.ObjectId, ref: "Session" },
  firstPartyUID: { type: Schema.Types.ObjectId, ref: "User" },
  secondUID: { type: Schema.Types.ObjectId, ref: "User" },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  attachments: [
    {
      type: {
        url: { type: String, required: true },
        name: { type: String, required: true },
        disType: { type: String, required: true },
      },
    },
  ], // name, url, type
  status: {
    type: String,
    required: true,
    enum: [
      "sent",
      "received",
      "in-progress",
      "suspended",
      "rejected",
      "resolved",
    ],
    default: "sent",
  },

  // resolverUID: { type: Schema.Types.ObjectId, ref: 'User' },
  resolverUID: { type: Schema.Types.ObjectId, ref: "User" },
  inProgressDate: { type: Date },
  receivedDate: { type: Date },
  suspendedDate: { type: Date },
  closedDate: { type: Date },
});

DisputeSchema.virtual("url").get(function () {
  return "disputes/" + this._id;
});

module.exports = model<IDispute>("Dispute", DisputeSchema);
