import { Schema, model } from "mongoose";
import { IAgreement } from "../types/interfaces";

const AgreementsSchema = new Schema<IAgreement>({
  name: { type: String, required: true },
  parties: [{ type: String, required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  details: { type: String, required: true },
  attachments: [{ type: Object }],
  reminder: { type: Boolean },
});

AgreementsSchema.virtual("url").get(function () {
  return "agreements/" + this._id;
});

module.exports = model<IAgreement>("Agreement", AgreementsSchema);
