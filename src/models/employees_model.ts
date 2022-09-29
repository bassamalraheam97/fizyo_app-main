import { Schema, model } from "mongoose";
import { IEmployee } from "../types/interfaces";

const EmployeesSchema = new Schema<IEmployee>({
  uID: { type: Schema.Types.ObjectId, ref: "User" },
  roleID: { type: Schema.Types.ObjectId, ref: "Role" },
  salary: { type: Number, required: true },
  attachments: [
    {
      type: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        empType: { type: String, required: true },
      },
    },
  ],
});

EmployeesSchema.virtual("url").get(function () {
  return "employees/" + this._id;
});

module.exports = model<IEmployee>("Employee", EmployeesSchema);
