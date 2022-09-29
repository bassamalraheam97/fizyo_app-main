import { Schema, model } from "mongoose";
import { IRole } from "../types/interfaces";

const RolesSchema = new Schema<IRole>({
  name: { type: String, required: true },
  employees: [{ type: String }],
  users: [{ type: String }],
  service_provider: [{ type: String }],
  clients: [{ type: String }],
  sessions: [{ type: String }],
  communications: [{ type: String }],
  disputes: [{ type: String }],
  enum_values: [{ type: String }],
});

RolesSchema.virtual("url").get(function () {
  return "roles/" + this._id;
});

module.exports = model<IRole>("Role", RolesSchema);
