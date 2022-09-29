import {
  Get,
  Post,
  Delete,
  Put,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Path,
} from "tsoa";
import { Model } from "mongoose";
import { ICommunication } from "../types/interfaces";

const CommunicationsModel: Model<ICommunication> = require("../models/communications_model");

@Route("communications")
export default class CommunicationsController {
  /**
   * Get List of All communications
   */
  @Get("/")
  public async getCommunications(): Promise<ICommunication[]> {
    return await CommunicationsModel.find().populate("referenceID");
  }

  /**
   * Get a communication details
   * @example communicationId "631371b43719f1a073ee6342"
   */
  @Response(404, "The requested communication is not found")
  @Get("{communicationId}")
  public async getCommunication(
    communicationId: string
  ): Promise<ICommunication | null> {
    return await CommunicationsModel.findById(communicationId).populate(
      "referenceID"
    );
  }

  /**
   * Delete a communication
   * @example communicationId "631371b43719f1a073ee6342"
   */
  @Response(404, "The requested communication is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{communicationId}")
  public async deleteCommunication(
    communicationId: string
  ): Promise<ICommunication | null> {
    return await CommunicationsModel.findByIdAndDelete(communicationId);
  }

  /**
   * Create a communication
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<ICommunication>({
    referenceType: "Agreement",
    referenceID: "630ded831cb815c4d98d3df6",
    partiesUIDs: ["63130ba28d796320172e58d6", "63124dffdcf1e4974079a441"],
    lastUpdate: new Date("2022-09-10"),
    messages: [
      {
        messageType: "txt",
        messageContent: "hello",
        senderUID: "63130ba28d796320172e58d6",
        sendDate: new Date("2022-09-10"),
        deliveryDetails: [{ status: "done" }],
      },
    ],
  })
  @Post("create")
  public async createCommunication(
    @Body() communication: ICommunication
  ): Promise<ICommunication> {
    return await new CommunicationsModel({ ...communication }).save();
  }

  /**
   * Update a communication
   * @example communicationId "631371b43719f1a073ee6342"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{communicationId}")
  public async updateCommunication(
    @Path() communicationId: string,
    @Body() communication: Partial<ICommunication>
  ): Promise<ICommunication | null> {
    let communicationDocument = await CommunicationsModel.findById(
      communicationId
    );
    if (communicationDocument != null) {
      communicationDocument.referenceType =
        communication.referenceType ?? communicationDocument.referenceType;
      communicationDocument.referenceID =
        communication.referenceID ?? communicationDocument.referenceID;
      communicationDocument.partiesUIDs =
        communication.partiesUIDs ?? communicationDocument.partiesUIDs;
      communicationDocument.lastUpdate =
        communication.lastUpdate ?? communicationDocument.lastUpdate;
      communicationDocument.messages =
        communication.messages ?? communicationDocument.messages;

      return await communicationDocument.save();
    }
    return null;
  }
}
