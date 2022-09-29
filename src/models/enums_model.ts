import { Schema, model } from "mongoose";

import { IEnumValues } from "../types/interfaces";

const EnumsSchema = new Schema<IEnumValues>({
  name: { type: String, required: true },
  values: [{ type: String, required: true }],
  note: { type: String },
});
EnumsSchema.virtual("url").get(function () {
  return "enumValues/" + this._id;
});
module.exports = model<IEnumValues>("EnumValue", EnumsSchema);
