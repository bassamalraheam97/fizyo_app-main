import { Schema, model } from "mongoose";
import { type } from "os";
import { ISession } from "../types/interfaces";

const SessionsSchema = new Schema<ISession>({
  sessionType: {
    type: String,
    enum: ["group", "individual"],
    default: "individual",
    required: true,
  },
  serviceProviderID: { type: Schema.Types.ObjectId, ref: "ServiceProvider" },
  // serviceProvidersID: { type: String },

  clientsID: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  // clientsIDs: { type: String },

  name: { type: String, required: true },
  details: { type: String, required: true },
  startDate: { type: Date },
  duration: { type: Number },
  serviceType: {
    type: String,
    enum: ["home", "office", "online"],
    default: "office",
  },
  location: { type: Object },
  attachments: {
    type: {
      url: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
    },
  },
  requirements: { type: String },
  ratings: [
    {
      type: {
        raterUID: { type: Schema.Types.ObjectId, ref: "User" },
        ratingValue: { type: String, required: true },
        ratingDate: { type: Date, required: true },
      },
    },
  ],
  reviews: [
    {
      type: {
        reviewerUID: { type: Schema.Types.ObjectId, ref: "User" },
        reviewDetails: { type: String, required: true },
        reviewDate: { type: Date, required: true },
      },
    },
  ],
  sessionFee: { type: Number, required: true },
  payments: {
    type: [
      {
        discount: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        payerID: {
          type: Schema.Types.ObjectId,
          ref: "Client",
          required: false,
        },
        // payerID: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  status: {
    type: String,
    enum: ["initiated", "agreed", "canceled", "finished"],
    default: "initiated",
    required: true,
  },
  doctorReferral: { type: String },
});
SessionsSchema.virtual("url").get(function () {
  return "sessions/" + this._id;
});
module.exports = model<ISession>("Session", SessionsSchema);
