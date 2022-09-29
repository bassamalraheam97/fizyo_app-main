import { Schema, model } from "mongoose";
import { type } from "os";

import { IAnnouncement } from "../types/interfaces";

const AnnouncementSchema = new Schema<IAnnouncement>({
  referenceType: {
    type: String,
    enum: ["Session", "Advertisement"],
    default: "Session",
    required: true,
  },
  referenceID: { type: Schema.Types.ObjectId, refPath: "referenceType" },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
  },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  sentDate: { type: Date, required: true },
  attachments: [
    {
      type: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, required: true },
      },
    },
  ],
  receiversUIDs: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // receiversUIDs: [{ type: String, required: true }],
});
AnnouncementSchema.virtual("url").get(function () {
  return "announcements/" + this._id;
});
module.exports = model<IAnnouncement>("Announcement", AnnouncementSchema);
