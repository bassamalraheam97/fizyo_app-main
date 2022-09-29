import { Schema, model } from "mongoose";
import { IUser, IEnumValues } from "../types/interfaces";
const bcrypt = require("bcrypt");

const UsersSchema = new Schema<IUser>({
  // Example on String
  email: { type: String },
  password: { type: String, required: true },
  profilePicture: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  DOB: { type: Date, required: false },
  address: [
    {
      country: { type: String, required: true },
      government: { type: String, required: true },
      manipolicity: { type: String, required: true },
    },
  ],
  verified: {
    type: String,
    required: true,
    enum: ["notSent", "pending", "verified"],
    default: "notSent",
  },
  status: {
    type: String,
    required: true,
    enum: ["inActive", "active", "suspended", "lost", "deleted"],
    default: "inActive",
  },
  accountType: {
    type: String,
    required: true,
    enum: ["PT", "EM", "PA"],
    default: "PT",
  },
  lastLoginDate: { type: Date, required: false },
  // Example on object
  accountSetting: { type: Object, required: false },
  // Example on String[]
  languages: [{ type: String, required: true }],
  maritalStatus: {
    type: String,
    required: true,
    enum: ["married", "single", "divorced", "widow"],
    default: "single",
  },
});
UsersSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});
UsersSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

UsersSchema.virtual("url").get(function () {
  return "users/" + this._id;
});

module.exports = model<IUser>("User", UsersSchema);
