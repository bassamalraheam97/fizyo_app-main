import {
  Get,
  Post,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Delete,
  Path,
  Put,
} from "tsoa";
import { ISession } from "../types/interfaces";
import { Model } from "mongoose";

const SessionModel: Model<ISession> = require("../models/sessions_model");

@Route("sessions")
export default class SessionController {
  /**
   * Get List of All Sessions
   */
  @Get("/")
  public async getSessions(): Promise<ISession[]> {
    return await SessionModel.find()
      .populate("serviceProvidersID")
      .populate("clientsIDs")
      .populate("raterUID")
      .populate("reviewerUID")
      .populate("payerID");
  }

  /**
   * Get a Session details
   * @example SessionId "63131c361ea32f520cb28bd6"
   */
  @Response(404, "the requested session in not found")
  @Get("{sessionId}")
  public async getSession(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findById(sessionId)
      .populate("serviceProvidersID")
      .populate("clientsIDs")
      .populate("raterUID")
      .populate("reviewerUID")
      .populate("payerID");
  }

  /**
   * Delete a session
   * @example sessionId "63131c361ea32f520cb28bd6"
   */
  @Response(404, "the requested session in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{sessionId}")
  public async deleteSession(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }

  /**
   * Create a session
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<ISession>({
    sessionType: "individual",
    serviceProviderID: "63107aae6bcd70f0f363847c",
    clientsID: ["6310750be8f4ab035351fb78", "63107517e8f4ab035351fb7a"],
    name: "math",
    details: "mathematical analysis",
    startDate: new Date("2022-09-10"),
    duration: 50,
    serviceType: "home",
    location: { city: "Aleppo" },
    attachments: [
      {
        url: "www.google.com",
        name: "cd",
        type: "pdf",
      },
    ],
    requirements: "no requirement",
    ratings: [
      {
        raterUID: "6310750be8f4ab035351fb78",
        ratingValue: "5",
        ratingDate: new Date("2022-09-10"),
      },
    ],
    reviews: [
      {
        reviewerUID: "6310750be8f4ab035351fb78",
        reviewDetails: "goooood",
        reviewDate: new Date("2022-09-10"),
      },
    ],
    sessionFee: 1500,
    payments: [
      {
        discount: 25,
        paymentMethod: "paypal",
        payerID: "6310750be8f4ab035351fb78",
        amount: 250,
      },
    ],
    status: "agreed",
    doctorReferral: "no ",
  })
  @Post("create")
  public async createSession(@Body() session: ISession): Promise<ISession> {
    return new SessionModel({
      ...session,
    }).save();
  }

  /**
   * Update a session
   * @example SessionId "63131c361ea32f520cb28bd6"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{sessionId}")
  public async updateSession(
    @Path() sessionId: string,
    @Body() session: Partial<ISession>
  ): Promise<ISession | null> {
    let sessionDocument = await SessionModel.findById(sessionId);
    if (sessionDocument != null) {
      sessionDocument.sessionType =
        session.sessionType ?? sessionDocument.sessionType;
      sessionDocument.serviceProviderID =
        session.serviceProviderID ?? sessionDocument.serviceProviderID;
      sessionDocument.clientsID =
        session.clientsID ?? sessionDocument.clientsID;
      sessionDocument.name = session.name ?? sessionDocument.name;
      sessionDocument.details = session.details ?? sessionDocument.details;

      sessionDocument.startDate =
        session.startDate ?? sessionDocument.startDate;
      sessionDocument.duration = session.duration ?? sessionDocument.duration;
      sessionDocument.serviceType =
        session.serviceType ?? sessionDocument.serviceType;
      sessionDocument.location = session.location ?? sessionDocument.location;
      sessionDocument.attachments =
        session.attachments ?? sessionDocument.attachments;
      sessionDocument.requirements =
        session.requirements ?? sessionDocument.requirements;
      sessionDocument.ratings = session.ratings ?? sessionDocument.ratings;
      sessionDocument.reviews = session.reviews ?? sessionDocument.reviews;
      sessionDocument.sessionFee =
        session.sessionFee ?? sessionDocument.sessionFee;
      sessionDocument.payments = session.payments ?? sessionDocument.payments;
      sessionDocument.status = session.status ?? sessionDocument.status;
      sessionDocument.doctorReferral =
        session.doctorReferral ?? sessionDocument.doctorReferral;
      return await sessionDocument.save();
    }
    return null;
  }
}
