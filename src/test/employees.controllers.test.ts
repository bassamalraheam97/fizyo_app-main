import { Model, Types } from "mongoose";
import EmployeesController from "../controllers/employees_controller";
import { IEmployee } from "../types/interfaces";

describe("ClientController", () => {
  const EmployeeModel: Model<IEmployee> = require("../models/employees_model");
  const controller = new EmployeesController();

  describe("createEmployee", () => {
    it("Should be created correctly", async () => {
      expect(
        async () =>
          await controller.createEmployee({
            uID: "6300e18b3bbd975cf6459983",
            roleID: "6300e18b3bbd975cf6459666",
            salary: 5000.5,
            attachments: [
              {
                name: "memo",
                url: "www.google.com",
                empType: "some type",
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe("getRoles", () => {
    it("Should get all employees", async () => {
      expect(async () => await controller.getEmployees()).not.toThrow();
    });
  });

  describe("updateEmployee", () => {
    it("Should update a specific employee correctly", async () => {
      expect(
        async () =>
          await controller.updateEmployee("6310750be8f4ab035351fb78", {
            salary: 550,
          })
      ).not.toThrow();
    });
  });

  describe("getEmployee", () => {
    it("Should get a specific employee by Id", async () => {
      expect(
        async () => await controller.getEmployee("6310750be8f4ab035351fb78")
      ).not.toThrow();
    });
  });

  describe("deleteEmployee", () => {
    it("Should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteEmployee("6310750be8f4ab035351fb78")
      ).not.toThrow();
    });
  });
});
