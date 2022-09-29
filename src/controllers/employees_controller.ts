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
import { IEmployee } from "../types/interfaces";

const EmployeesModel: Model<IEmployee> = require("../models/employees_model");

@Route("employees")
export default class EmployeesController {
  /**
   * Get all employees
   */
  @Get("/")
  public async getEmployees(): Promise<IEmployee[]> {
    return await EmployeesModel.find().populate("uID").populate("roleID");
  }

  /**
   * Get employee details
   * @example employeeId "6313151791b8bbcc188d8e37"
   */
  @Response(404, "The requested employee is not found")
  @Get("{employeeId}")
  public async getEmployee(employeeId: string): Promise<IEmployee | null> {
    return await EmployeesModel.findById(employeeId);
  }

  /**
   * Delete employee
   * @example employeeId "6313151791b8bbcc188d8e37"
   */
  @Response(404, "The requested role is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{employeeId}")
  public async deleteEmployee(employeeId: string): Promise<IEmployee | null> {
    return await EmployeesModel.findByIdAndDelete(employeeId);
  }

  /**
   * Create employee
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  @Example<IEmployee>({
    uID: "63130ba28d796320172e58d6",
    roleID: "631312818d796320172e58e5",
    salary: 5000.5,
    attachments: [
      {
        name: "memo",
        url: "www.google.com",
        empType: "some type",
      },
    ],
  })
  @Post("create")
  public async createEmployee(@Body() employee: IEmployee): Promise<IEmployee> {
    return await new EmployeesModel({ ...employee }).save();
  }

  /**
   * Update employee
   * @example employeeId "6313151791b8bbcc188d8e37"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{employeeId}")
  public async updateEmployee(
    @Path() employeeId: string,
    @Body() employee: Partial<IEmployee>
  ): Promise<IEmployee | null> {
    let employeeDocument = await EmployeesModel.findById(employeeId);
    if (employeeDocument != null) {
      employeeDocument.uID = employee.uID ?? employeeDocument.uID;
      employeeDocument.roleID = employee.roleID ?? employeeDocument.roleID;
      employeeDocument.salary = employee.salary ?? employeeDocument.salary;
      employeeDocument.attachments =
        employee.attachments ?? employeeDocument.attachments;
      return await employeeDocument.save();
    }
    return null;
  }
}
