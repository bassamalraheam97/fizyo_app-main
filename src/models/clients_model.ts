import { Schema, model } from "mongoose";
import { IClient } from "../types/interfaces";

const ClientsSchema = new Schema<IClient>({
  uID: { type: Schema.Types.ObjectId, ref: "User" },
  preferredServiceType: [
    {
      type: String,
      required: true,
      enum: ["online", "home", "office"],
      default: "online",
    },
  ],
  diseases: [{ type: String, required: true }],
  preferences: { type: Object, required: true },
});

ClientsSchema.virtual("url").get(function () {
  return "clients/" + this._id;
});

module.exports = model<IClient>("Client", ClientsSchema);
