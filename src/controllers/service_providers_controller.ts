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
import { IServiceProvider } from "../types/interfaces";

const ServiceProvidersModel: Model<IServiceProvider> = require("../models/service_providers_model");

@Route("serviceProviders")
export default class ServiceProvidersController {
  /**
   * Get List of All serviceProviders
   */
  @Get("/")
  public async getServiceProviders(): Promise<IServiceProvider[]> {
    return await ServiceProvidersModel.find()
      .populate("uID")
      .populate("reviewerUIDs")
      .populate("verifiedByUID");
  }

  /**
   * Get a serviceProvider details
   * @example serviceProviderId "63107aae6bcd70f0f363847c"
   */
  @Response(404, "The requested serviceProvider is not found")
  @Get("{serviceProviderId}")
  public async getServiceProvider(
    serviceProviderId: string
  ): Promise<IServiceProvider | null> {
    return await ServiceProvidersModel.findById(serviceProviderId)
      .populate("uID")
      .populate("reviewerUIDs")
      .populate("verifiedByUID");
  }

  /**
   * Delete a serverProvider
   * @example serviceProviderId "63107aae6bcd70f0f363847c"
   */
  @Response(404, "The requested serviceProvider is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{serviceProviderId}")
  public async deleteServiceProvider(
    serviceProviderId: string
  ): Promise<IServiceProvider | null> {
    return await ServiceProvidersModel.findByIdAndDelete(serviceProviderId);
  }

  /**
   * Create a serviceProvider
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IServiceProvider>({
    uID: "63124dffdcf1e4974079a441",
    bio: "this is the best",
    specialties: ["Physiotherapist"],
    preferredServiceType: ["online", "home", "office"],
    minSessionFee: 100.0,
    maxSessionFee: 150.0,
    documents: [
      {
        url: "http://localhost:8000/documents",
        name: "certificate",
        type: "pdf",
      },
    ],
    reviewerUIDs: ["63124dffdcf1e4974079a441", "63130ba28d796320172e58d6"],
    verificationStatus: "notSubmitted",

    verificationDate: new Date("2022-09-10"),
    verifiedByUID: "63130ba28d796320172e58d6",
  })
  @Post("create")
  public async createServiceProvider(
    @Body() serviceProvider: IServiceProvider
  ): Promise<IServiceProvider> {
    return await new ServiceProvidersModel({ ...serviceProvider }).save();
  }

  /**
   * Update a ServiceProvider
   * @example serviceProviderId "63107aae6bcd70f0f363847c"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{serviceProviderId}")
  public async updateServiceProvider(
    @Path() serviceProviderId: string,
    @Body() serviceProvider: Partial<IServiceProvider>
  ): Promise<IServiceProvider | null> {
    let serviceProviderDocument = await ServiceProvidersModel.findById(
      serviceProviderId
    );
    if (serviceProviderDocument != null) {
      serviceProviderDocument.uID =
        serviceProvider.uID ?? serviceProviderDocument.uID;
      serviceProviderDocument.bio =
        serviceProvider.bio ?? serviceProviderDocument.bio;
      serviceProviderDocument.specialties =
        serviceProvider.specialties ?? serviceProviderDocument.specialties;
      serviceProviderDocument.preferredServiceType =
        serviceProvider.preferredServiceType ??
        serviceProviderDocument.preferredServiceType;
      serviceProviderDocument.minSessionFee =
        serviceProvider.minSessionFee ?? serviceProviderDocument.minSessionFee;
      serviceProviderDocument.maxSessionFee =
        serviceProvider.maxSessionFee ?? serviceProviderDocument.maxSessionFee;
      serviceProviderDocument.documents =
        serviceProvider.documents ?? serviceProviderDocument.documents;
      serviceProviderDocument.reviewerUIDs =
        serviceProvider.reviewerUIDs ?? serviceProviderDocument.reviewerUIDs;
      serviceProviderDocument.verificationStatus =
        serviceProvider.verificationStatus ??
        serviceProviderDocument.verificationStatus;

      serviceProviderDocument.verificationDate =
        serviceProvider.verificationDate ??
        serviceProviderDocument.verificationDate;
      serviceProviderDocument.verifiedByUID =
        serviceProvider.verifiedByUID ?? serviceProviderDocument.verifiedByUID;
      return await serviceProviderDocument.save();
    }
    return null;
  }
}
