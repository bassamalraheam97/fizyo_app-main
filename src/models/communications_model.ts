import { Schema, model } from "mongoose";
import { ICommunication } from "../types/interfaces";

const CommunicationsSchema = new Schema<ICommunication>({
  referenceType: {
    type: String,
    required: true,
    enum: ["Agreement", "Session", "Dispute", "User"],
    default: "Session",
  },
  referenceID: {
    type: Schema.Types.ObjectId,
    refPath: "referenceType",
    required: true,
  },
  partiesUIDs: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
  // partiesUIDs: [{ type: String }],
  lastUpdate: { type: Date, required: true },
  messages: [
    {
      type: {
        messageType: { type: String, required: true },
        messageContent: { type: String, required: true },
        senderUID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        sendDate: { type: Date, required: true },
        deliveryDetails: [{ type: Object }],
      },
    },
  ],
});
CommunicationsSchema.virtual("url").get(function () {
  return "communications/" + this._id;
});

module.exports = model<ICommunication>("Communication", CommunicationsSchema);
