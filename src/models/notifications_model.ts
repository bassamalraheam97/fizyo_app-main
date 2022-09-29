import { Schema, model } from "mongoose";
import { INotification } from "../types/interfaces";

const NotificationsSchema = new Schema<INotification>({
  referenceType: {
    type: String,
    enum: [
      "Session",
      "Agreement",
      "Dispute",
      "Alarm",
      "Announcement",
      "User",
      "Communication",
    ],
    default: "Session",
    required: true,
  },
  referenceID: { type: Schema.Types.ObjectId, ref: "referenceType" },
  status: {
    type: String,
    enum: ["sent", "delivered", "opened"],
    default: "sent",
    required: true,
  },
  title: { type: String, required: true },
  details: { type: String, required: true },
  sentDate: { type: Date, required: true },
  receivedDate: { type: Date },
  openDate: { type: Date },
  receiverUID: { type: Schema.Types.ObjectId, ref: "User" },
});
NotificationsSchema.virtual("url").get(function () {
  return "notifications/" + this._id;
});
module.exports = model<INotification>("Notification", NotificationsSchema);
