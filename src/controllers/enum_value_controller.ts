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
import { IEnumValues } from "../types/interfaces";
import { Model } from "mongoose";

const EnumModel: Model<IEnumValues> = require("../models/enums_model");

@Route("enums")
export default class EnumController {
  /**
   * Get List of All Enums
   */
  @Get("/")
  public async getEnums(): Promise<IEnumValues[]> {
    return await EnumModel.find();
  }

  /**
   * Get a Enums details
   * @example enumId "631370d58ec48bbce3f18fb6"
   */
  @Response(404, "the requested enum in not found")
  @Get("{enumId}")
  public async getEnum(enumId: string): Promise<IEnumValues | null> {
    return await EnumModel.findById(enumId);
  }

  /**
   * Delete a enum
   * @example enumId "631370d58ec48bbce3f18fb6"
   */
  @Response(404, "the requested enum in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{enumId}")
  public async deleteEnum(enumId: string) {
    return await EnumModel.findByIdAndDelete(enumId);
  }

  /**
   * Create a enum
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IEnumValues>({
    name: "session",
    values: ["first", "second"],
    note: "test",
  })
  @Post("create")
  public async createEnum(@Body() enums: IEnumValues): Promise<IEnumValues> {
    return new EnumModel({
      ...enums,
    }).save();
  }

  /**
   * Update a enum
   * @example enumId "631370d58ec48bbce3f18fb6"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{enumId}")
  public async updateEnum(
    @Path() enumId: string,
    @Body() enums: Partial<IEnumValues>
  ): Promise<IEnumValues | null> {
    let enumDocument = await EnumModel.findById(enumId);
    if (enumDocument != null) {
      enumDocument.name = enums.name ?? enumDocument.name;
      enumDocument.values = enums.values ?? enumDocument.values;
      enumDocument.note = enums.note ?? enumDocument.note;

      return await enumDocument.save();
    }
    return null;
  }
}
