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
import { IAgreement } from "../types/interfaces";

const AgreementsModel: Model<IAgreement> = require("../models/agreements_model");

@Route("agreements")
export default class AgreementsController {
  /**
   * Get List of All agreements
   */
  @Get("/")
  public async getAgreements(): Promise<IAgreement[]> {
    return await AgreementsModel.find();
  }

  /**
   * Get a agreement details
   * @example agreementId "630ded831cb815c4d98d3df6"
   */
  @Response(404, "The requested agreement is not found")
  @Get("{agreementId}")
  public async getAgreement(agreementId: string): Promise<IAgreement | null> {
    return await AgreementsModel.findById(agreementId);
  }

  /**
   * Delete a agreement
   * @example agreementId "630ded831cb815c4d98d3df6"
   */
  @Response(404, "The requested agreement is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{agreementId}")
  public async deleteAgreement(
    agreementId: string
  ): Promise<IAgreement | null> {
    return await AgreementsModel.findByIdAndDelete(agreementId);
  }

  /**
   * Create a agreement
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IAgreement>({
    name: "Ahmad",
    parties: ["63124dffdcf1e4974079a441"],
    startDate: new Date("2022-09-10"),
    endDate: new Date("2022-09-10"),
    details: "first Agreement",
    attachments: [],
    reminder: true,
  })
  @Post("create")
  public async createAgreement(
    @Body() agreement: IAgreement
  ): Promise<IAgreement> {
    return await new AgreementsModel({ ...agreement }).save();
  }

  /**
   * Update a agreement
   * @example agreementId "630ded831cb815c4d98d3df6"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{agreementId}")
  public async updateAgreement(
    @Path() agreementId: string,
    @Body() agreement: Partial<IAgreement>
  ): Promise<IAgreement | null> {
    let agreementDocument = await AgreementsModel.findById(agreementId);
    if (agreementDocument != null) {
      agreementDocument.name = agreement.name ?? agreementDocument.name;
      agreementDocument.parties =
        agreement.parties ?? agreementDocument.parties;
      agreementDocument.startDate =
        agreement.startDate ?? agreementDocument.startDate;
      agreementDocument.endDate =
        agreement.endDate ?? agreementDocument.endDate;
      agreementDocument.details =
        agreement.details ?? agreementDocument.details;
      agreementDocument.attachments =
        agreement.attachments ?? agreementDocument.attachments;
      agreementDocument.reminder =
        agreement.reminder ?? agreementDocument.reminder;

      return await agreementDocument.save();
    }
    return null;
  }
}
