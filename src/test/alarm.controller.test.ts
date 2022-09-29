import { Model, Types } from "mongoose";
import AlarmController from "../controllers/alarm_controller";
import { IAlarm } from "../types/interfaces";

describe("AlarmController", () => {
  const AlarmModel: Model<IAlarm> = require("../models/alarms_model");
  const controller = new AlarmController();

  describe("createAlarm", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAlarm({
            _id: "6313197208b52ee1da804111",
            name: "new therpist",
            referenceType: "Dispute",
            referenceID: "6313197208b52ee1da804405",
            frequencyUnit: "Days",
            frequency: 15,
            active: true,
            startDate: new Date("2022-10-11"),
            endDate: new Date("2022-10-11"),
          })
      ).not.toThrow();
    });
  });

  describe("getAlarms", () => {
    it("should get all Alarms", async () => {
      expect(async () => await controller.getAlarms()).not.toThrow();
    });
  });

  describe("updateAlarm", () => {
    it("should update a specific alarm correctly", async () => {
      expect(
        async () =>
          await controller.updateAlarm("6313197208b52ee1da804111", {
            frequencyUnit: "Hours",
            frequency: 25,
          })
      ).not.toThrow();
    });
  });

  describe("getAlarm", () => {
    it("should get a specific notification by Id", async () => {
      expect(
        async () => await controller.getAlarm("6313197208b52ee1da804111")
      ).not.toThrow();
    });
  });

  describe("deleteAlarm", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteAlarm("6313197208b52ee1da804111")
      ).not.toThrow();
    });
  });
});
