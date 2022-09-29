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
import { IRole } from "../types/interfaces";

const RolesModel: Model<IRole> = require("../models/roles_model");

@Route("roles")
export default class RolesController {
  /**
   * Get all of roles
   */
  @Get("/")
  public async getRoles(): Promise<IRole[]> {
    return await RolesModel.find();
  }

  /**
   * Get role details
   * @example roleId "631312818d796320172e58e5"
   */
  @Response(404, "The requested role is not found")
  @Get("{roleId}")
  public async getRole(roleId: string): Promise<IRole | null> {
    return await RolesModel.findById(roleId);
  }

  /**
   * Delete role
   * @example roleId "631312818d796320172e58e5"
   */
  @Response(404, "The requested role is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{roleId}")
  public async deleteRole(roleId: string): Promise<IRole | null> {
    return await RolesModel.findByIdAndDelete(roleId);
  }

  /**
   * Create role
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  // @Example<IRole>({
  //   name: "Admin",
  //   users: [""],
  // })
  @Post("create")
  public async createRole(@Body() role: IRole): Promise<IRole> {
    return await new RolesModel({ ...role }).save();
  }

  /**
   * Update role
   * @example roleId "631312818d796320172e58e5"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{roleId}")
  public async updateRole(
    @Path() roleId: string,
    @Body() role: Partial<IRole>
  ): Promise<IRole | null> {
    let roleDocument = await RolesModel.findById(roleId);
    if (roleDocument != null) {
      roleDocument.name = role.name ?? roleDocument.name;
      roleDocument.employees = role.employees ?? roleDocument.employees;
      roleDocument.users = role.users ?? roleDocument.users;
      roleDocument.service_provider =
        role.service_provider ?? roleDocument.service_provider;
      roleDocument.clients = role.clients ?? roleDocument.clients;
      roleDocument.sessions = role.sessions ?? roleDocument.sessions;
      roleDocument.communications =
        role.communications ?? roleDocument.communications;
      roleDocument.disputes = role.disputes ?? roleDocument.disputes;
      roleDocument.enum_values = role.enum_values ?? roleDocument.enum_values;
      return await roleDocument.save();
    }
    return null;
  }
}
