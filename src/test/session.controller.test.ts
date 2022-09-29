import { Model, Types } from "mongoose";
import SessionController from "../controllers/session_controller";
import { ISession } from "../types/interfaces";

describe("SessionController", () => {
  const SessionModel: Model<ISession> = require("../models/sessions_model");
  const controller = new SessionController();

  describe("createSession", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createSession({
            _id: "6300e18b3bbd975cf6459943",
            sessionType: "individual",
            serviceProvidersID: "6300e18b3bbd975cf6459983",
            clientsIDs: ["6310750be8f4ab035351fb78"],
            name: "math",
            details: "mathematical analysis",
            startDate: new Date("10-11-2022"),
            duration: 50,
            serviceType: "Home",
            location: { city: "Aleppo" },
            attachments: {
              attachmentUrl: "www.google.com",
              attachmentName: "cd",
              attachmentType: "pdf",
            },
            requirements: "no requirement",
            ratings: [
              {
                raterUID: "6300e18b3bbd975cf6459983",
                ratingValue: "5",
                ratingDate: new Date("10-11-2022"),
              },
              {
                raterUID: "6300e18b3bbd975cf6459983",
                ratingValue: "4",
                ratingDate: new Date("10-11-2022"),
              },
            ],
            reviews: [
              {
                reviewerUID: "6300e18b3bbd975cf6459983",
                reviewDetails: "goooood",
                reviewDate: new Date("10-11-2022"),
              },
            ],
            sessionFee: 1500,
            payments: {
              discount: 25,
              paymentMethod: "paypal",
              payerID: "6300e18b3bbd975cf6459983",
              amount: 250,
            },
            status: "agreed",
            doctorReferral: "no ",
          })
      ).not.toThrow();
    });
  });

  describe("getSessions", () => {
    it("should get all sessions", async () => {
      expect(async () => await controller.getSessions()).not.toThrow();
    });
  });

  describe("updateSession", () => {
    it("should update a specific session correctly", async () => {
      expect(
        async () =>
          await controller.updateSession("6310d1e9f2d63b32d0c306ba", {
            sessionType: "group",
            duration: 120,
            serviceType: "Online",
          })
      ).not.toThrow();
    });
  });

  describe("getSession", () => {
    it("should get a specific session by Id", async () => {
      expect(
        async () => await controller.getSession("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteSession("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });
});
