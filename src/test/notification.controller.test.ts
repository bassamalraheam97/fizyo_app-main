import { Model, Types } from "mongoose";
import NotificationController from "../controllers/notification_controller";
import { INotification } from "../types/interfaces";

describe("NotificationController", () => {
  const NotificationModel: Model<INotification> = require("../models/notifications_model");
  const controller = new NotificationController();

  describe("createNotification", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createNotification({
            _id: "6313197208b52ee1da804555",
            referenceType: "Agreement",
            referenceID: "6313197208b52ee1da804405",
            statues: "opened",
            title: "Warning",
            details: "this notification title",
            sentDate: new Date("2022-10-11"),
            receivedDate: new Date("2022-11-11"),
            openDate: new Date("2022-11-11"),
            receiverUID: "6313197208b52ee1da804405",
          })
      ).not.toThrow();
    });
  });

  describe("getNotifications", () => {
    it("should get all notifications", async () => {
      expect(async () => await controller.getNotifications()).not.toThrow();
    });
  });

  describe("updateNotification", () => {
    it("should update a specific notification correctly", async () => {
      expect(
        async () =>
          await controller.updateNotification("6313197208b52ee1da804405", {
            statues: "opened",
            details: "change information",
          })
      ).not.toThrow();
    });
  });

  describe("getNotification", () => {
    it("should get a specific notification by Id", async () => {
      expect(
        async () => await controller.getNotification("6313197208b52ee1da804405")
      ).not.toThrow();
    });
  });

  describe("deleteNotification", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteNotification("6313197208b52ee1da804405")
      ).not.toThrow();
    });
  });
});
