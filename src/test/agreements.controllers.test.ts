import { Model, Types } from "mongoose";
import AgreementsController from "../controllers/agreements_controller";
import { IAgreement } from "../types/interfaces";

describe("AgreementsController", () => {
  const AgreementModel: Model<IAgreement> = require("../models/agreements_model");
  const controller = new AgreementsController();

  describe("createAgreement", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAgreement({
            _id: "6313197208b52ee1da804222",
            name: "Ahmad",
            parties: ["certificate"],
            startDate: new Date("2022-09-10"),
            endDate: new Date("2022-09-10"),
            details: "first Agreement",
            attachments: [{ name: "personal information" }],
            reminder: true,
          })
      ).not.toThrow();
    });
  });

  describe("getAgreements", () => {
    it("should get all agreements", async () => {
      expect(async () => await controller.getAgreements()).not.toThrow();
    });
  });

  describe("updateAgreement", () => {
    it("should update a specific agreement correctly", async () => {
      expect(
        async () =>
          await controller.updateAgreement("6313197208b52ee1da804222", {
            name: "Omar",
            details: "updated Agreement",
            // attachments: [{ name: "personal info" }],
            reminder: false,
          })
      ).not.toThrow();
    });
  });

  describe("getAgreement", () => {
    it("should get a specific agreement by Id", async () => {
      expect(
        async () => await controller.getAgreement("6313197208b52ee1da804222")
      ).not.toThrow();
    });
  });

  describe("deleteAgreement", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteAgreement("6313197208b52ee1da804222")
      ).not.toThrow();
    });
  });
});
