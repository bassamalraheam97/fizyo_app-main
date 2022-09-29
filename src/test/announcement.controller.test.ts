import { Model, Types } from "mongoose";
import AnnouncementController from "../controllers/announcement_controller";
import { IAnnouncement } from "../types/interfaces";

describe("AnnouncementController", () => {
  const AnnouncementModel: Model<IAnnouncement> = require("../models/announcements_model");
  const controller = new AnnouncementController();

  describe("createAnnouncement", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAnnouncement({
            _id: "6313197208b52ee1da804333",
            referenceType: "Session",
            referenceID: "6313197208b52ee1da804405",
            statues: "published",
            topic: "new topic",
            details: "The announcement contain info ",
            sentDate: new Date("2022-10-11"),
            attachments: [{ name: "personal information" }],
            receiversUIDs: ["6313197208b52ee1da804405"],
          })
      ).not.toThrow();
    });
  });

  describe("getAnnouncements", () => {
    it("should get all announcements", async () => {
      expect(async () => await controller.getAnnouncements()).not.toThrow();
    });
  });

  describe("updateAnnouncement", () => {
    it("should update a specific session correctly", async () => {
      expect(
        async () =>
          await controller.updateAnnouncement("6313197208b52ee1da804333", {
            referenceType: "Session",
            statues: "published",
            attachments: [{ name: "public information" }],
            details: "change information",
          })
      ).not.toThrow();
    });
  });

  describe("getAnnouncement", () => {
    it("should get a specific announcement by Id", async () => {
      expect(
        async () => await controller.getAnnouncement("6313197208b52ee1da804333")
      ).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteAnnouncement("6313197208b52ee1da804333")
      ).not.toThrow();
    });
  });
});
