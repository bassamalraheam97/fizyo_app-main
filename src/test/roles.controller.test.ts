import { Model } from "mongoose";
import RolesController from "../controllers/roles_controller";
import { IRole } from "../types/interfaces";

describe("RolesController", () => {
  const RolesModel: Model<IRole> = require("../models/roles_model");
  const controller = new RolesController();

  describe("createRole", () => {
    it("Should be created correctly", async () => {
      expect(
        async () =>
          await controller.createRole({
            _id: "6300e18b3bbd975cf6459666",
            name: "Admin2",
            employees: [],
            users: [],
            service_provider: [],
            clients: [],
            sessions: [],
            communications: [],
            disputes: [],
            enum_values: [],
          })
      ).not.toThrow();
    });
  });

  describe("getRoles", () => {
    it("Should get all roles", async () => {
      expect(async () => await controller.getRoles()).not.toThrow();
    });
  });

  describe("updateRoles", () => {
    it("should update a specific role correctly", async () => {
      expect(
        async () =>
          await controller.updateRole("6300e18b3bbd975cf6459666", {
            name: "updatedName",
          })
      ).not.toThrow();
    });
  });

  describe("getRole", () => {
    it("Should get a specific role by Id", async () => {
      expect(
        async () => await controller.getRole("6300e18b3bbd975cf6459666")
      ).not.toThrow();
    });
  });

  describe("deleteUseRole", () => {
    it("Should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteRole("6300e18b3bbd975cf6459666")
      ).not.toThrow();
    });
  });
});
