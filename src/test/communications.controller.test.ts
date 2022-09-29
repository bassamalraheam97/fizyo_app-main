import { Model, Types } from "mongoose";
import CommunicationsController from "../controllers/communications_controller";
import { ICommunication } from "../types/interfaces";

describe("CommunicationsController", () => {
  const CommunicationModel: Model<ICommunication> = require("../models/communications_model");
  const controller = new CommunicationsController();

  describe("createCommunication", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createCommunication({
            _id: "6300e18b3bbd975rr6457777",
            referenceType: "Dispute",
            referenceID: "6300e18b3bbd975cf6456666",
            partiesUIDs: ["6300e18b3bbd975cf6459983"],
            lastUpdate: new Date("2022-09-10"),
            messages: [
              {
                messageType: "txt",
                messageContent: "hello",
                senderUID: "6300e18b3bbd975cf6459983",
                sendDate: new Date("2022-09-10"),
                deliveryDetails: [{ status: "done" }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe("getCommunications", () => {
    it("should get all communications", async () => {
      expect(async () => await controller.getCommunications()).not.toThrow();
    });
  });

  describe("updateCommunication", () => {
    it("should update a specific communication correctly", async () => {
      expect(
        async () =>
          await controller.updateCommunication("6300e18b3bbd975rr6457777", {
            messages: [
              {
                messageType: "voice",
                messageContent: "hiii",
                senderUID: "6300e18b3bbd975cf6459983",
                sendDate: new Date("2022-09-10"),
                deliveryDetails: [{ status: "updated" }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe("getCommunication", () => {
    it("should get a specific communication by Id", async () => {
      expect(
        async () =>
          await controller.getCommunication("6300e18b3bbd975rr6457777")
      ).not.toThrow();
    });
  });

  describe("deleteCommunication", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteCommunication("6300e18b3bbd975rr6457777")
      ).not.toThrow();
    });
  });
});
