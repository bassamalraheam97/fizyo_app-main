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
import { IAlarm } from "../types/interfaces";
import { Model } from "mongoose";

const AlarmModel: Model<IAlarm> = require("../models/alarms_model");

@Route("alarms")
export default class AlarmController {
  /**
   * Get List of All Alarms
   */
  @Get("/")
  public async getAlarms(): Promise<IAlarm[]> {
    return await AlarmModel.find().populate("referenceID");
  }

  /**
   * Get a Alarm details
   * @example alarmId "63133c886978820e456b8015"
   */
  @Response(404, "the requested Alarm in not found")
  @Get("{alarmId}")
  public async getAlarm(alarmId: string): Promise<IAlarm | null> {
    return await AlarmModel.findById(alarmId).populate("referenceID");
  }

  /**
   * Delete a alarm
   * @example alarmId "63133c886978820e456b8015"
   */
  @Response(404, "the requested alarm in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{alarmId}")
  public async deleteAlarm(alarmId: string) {
    return await AlarmModel.findByIdAndDelete(alarmId);
  }

  /**
   * Create a alarm
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IAlarm>({
    name: "new therapist",
    referenceType: "Agreement",
    referenceID: "63131c361ea32f520cb28bd6",
    frequencyUnit: "Days",
    frequency: 15,
    active: true,
    startDate: new Date("2022-09-10"),
    endDate: new Date("2022-09-10"),
  })
  @Post("create")
  public async createAlarm(@Body() alarm: IAlarm): Promise<IAlarm> {
    return new AlarmModel({
      ...alarm,
    }).save();
  }

  /**
   * Update a alarm
   * @example alarmId "63133c886978820e456b8015"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{alarmId}")
  public async updateAlarm(
    @Path() alarmId: string,
    @Body() alarm: Partial<IAlarm>
  ): Promise<IAlarm | null> {
    let alarmDocument = await AlarmModel.findById(alarmId);
    if (alarmDocument != null) {
      alarmDocument.name = alarm.name ?? alarmDocument.name;
      alarmDocument.referenceType =
        alarm.referenceType ?? alarmDocument.referenceType;
      alarmDocument.referenceID =
        alarm.referenceID ?? alarmDocument.referenceID;

      alarmDocument.frequencyUnit =
        alarm.frequencyUnit ?? alarmDocument.frequencyUnit;
      alarmDocument.frequency = alarm.frequency ?? alarmDocument.frequency;

      alarmDocument.active = alarm.active ?? alarmDocument.active;
      alarmDocument.startDate = alarm.startDate ?? alarmDocument.startDate;
      alarmDocument.endDate = alarm.endDate ?? alarmDocument.endDate;

      return await alarmDocument.save();
    }
    return null;
  }
}
