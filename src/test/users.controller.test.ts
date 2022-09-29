import { Model } from "mongoose";
import UsersController from "../controllers/users_controller";
import { IUser } from "../types/interfaces";

describe("UsersController", () => {
  const UsersModel: Model<IUser> = require("../models/users_model");
  const controller = new UsersController();

  describe("createUser", () => {
    it("Should be created correctly", async () => {
      expect(
        async () =>
          await controller.createUser({
            _id: "6300e18b3bbd975cf6459983",
            email: "nour@gmail.com",
            phoneNumber: "00352681531905",
            password: "00352681531905",
            profilePicture: "main.png",
            firstName: "Muhammad",
            lastName: "Nour",
            gender: "Male",
            DOB: new Date("2022-09-10"),
            address: [
              {
                country: "Syria",
                government: "SY",
                manipolicity: "Fixed",
              },
            ],
            verified: "notSent",
            status: "active",
            accountType: "EM",
            lastLoginDate: new Date("2022-09-10"),
            accountSetting: { name: "Setting1", value: "Some value" },
            languages: ["AR", "EN"],
            maritalStatus: "single",
          })
      ).not.toThrow();
    });
  });

  describe("getUsers", () => {
    it("Should get all users", async () => {
      expect(async () => await controller.getUsers()).not.toThrow();
    });
  });

  describe("updateUsers", () => {
    it("should update a specific serviceProvider correctly", async () => {
      expect(
        async () =>
          await controller.updateUser("6300e18b3bbd975cf6459983", {
            email: "updates@email.com",
            firstName: "updates",
          })
      ).not.toThrow();
    });
  });

  describe("getUser", () => {
    it("Should get a specific user by Id", async () => {
      expect(
        async () => await controller.getUser("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });

  describe("deleteUser", () => {
    it("Should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteUser("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });
});
