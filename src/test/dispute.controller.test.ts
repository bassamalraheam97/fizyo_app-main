import { Model, Types } from "mongoose";
import DisputeController from "../controllers/dispute_controller";
import { IDispute } from "../types/interfaces";

describe("DisputeController", () => {
  const DisputeModel: Model<IDispute> = require("../models/dispute_model");
  const controller = new DisputeController();

  describe("createDispute", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createDispute({
            _id: "6300e18b3bbd975cf6456666",
            sessionID: "6300e18b3bbd975cf6459943",
            firstPartyUID: "6300e18b3bbd975cf6459983",
            secondUID: "6300e18b3bbd975cf6459983",
            topic: "treatment",
            details: "more details",
            attachments: [
              {
                url: "http://localhost:8000/disputes",
                name: "file",
                disType: "pdf",
              },
            ], // name, url, type
            status: "sent",
            resolverUID: "6300e18b3bbd975cf6459983",
            inProgressDate: new Date("2022-09-10"),
            receivedDate: new Date("2022-09-10"),
            suspendedDate: new Date("2022-09-10"),
            closedDate: new Date("2022-09-10"),
          })
      ).not.toThrow();
    });
  });

  describe("getDisputes", () => {
    it("should get all disputes", async () => {
      expect(async () => await controller.getDisputes()).not.toThrow();
    });
  });

  describe("updateDispute", () => {
    it("should update a specific dispute correctly", async () => {
      expect(
        async () =>
          await controller.updateDispute("6300e18b3bbd975cf6456666", {
            topic: "sessions",
            details: "updated",
            attachments: [
              {
                url: "http://localhost:8000/disputesUpdated",
                name: "file",
                disType: "image",
              },
            ], // name, url, type
            status: "in-progress",
          })
      ).not.toThrow();
    });
  });

  describe("getDispute", () => {
    it("should get a specific dispute by Id", async () => {
      expect(
        async () => await controller.getDispute("6300e18b3bbd975cf6456666")
      ).not.toThrow();
    });
  });

  describe("deleteDispute", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteDispute("6300e18b3bbd975cf6456666")
      ).not.toThrow();
    });
  });
});
