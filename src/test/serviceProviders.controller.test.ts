import { Model, Types } from "mongoose";
import ServiceProvidersController from "../controllers/service_providers_controller";
import { IServiceProvider } from "../types/interfaces";

describe("ServiceProvidersController", () => {
  const ServiceProvidersModel: Model<IServiceProvider> = require("../models/service_providers_model");
  const controller = new ServiceProvidersController();

  describe("createServiceProvider", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createServiceProvider({
            _id: "6300e18b3bbd975cf6459983",
            uID: "6300e18b3bbd975cf6459983",
            bio: "this is the best",
            specialties: "Physiotherapist",
            preferredServiceType: ["online", "home", "office"],
            minSessionFee: 100.0,
            maxSessionFee: 150.0,
            documents: {
              url: "http://localhost:8000/documents",
              name: "certificate",
              attType: "pdf",
            },
            reviewerUIDs: ["6300e18b3bbd975cf6459983"],
            verificationStatus: "notSubmitted",

            verificationDate: new Date("2022-09-10"),
            verifiedByUID: "6300e18b3bbd975cf6459983",
          })
      ).not.toThrow();
    });
  });

  describe("getServiceProviders", () => {
    it("should get all serviceProviders", async () => {
      expect(async () => await controller.getServiceProviders()).not.toThrow();
    });
  });

  describe("updateServiceProvider", () => {
    it("should update a specific serviceProvider correctly", async () => {
      expect(
        async () =>
          await controller.updateServiceProvider("6300e18b3bbd975cf6459983", {
            bio: "updated",
            specialties: "Physio",
            verificationStatus: "verified",
          })
      ).not.toThrow();
    });
  });

  describe("getServiceProvider", () => {
    it("should get a specific serviceProvider by Id", async () => {
      expect(
        async () =>
          await controller.getServiceProvider("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });

  describe("deleteServiceProvider", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteServiceProvider("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });
});
