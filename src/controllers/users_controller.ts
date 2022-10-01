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
import { IUser } from "../types/interfaces";
import dotenv from "dotenv";

const UsersModel: Model<IUser> = require("../models/users_model");
const messages= require('../common/return_messages');
const common_methods = require('../common/common_methods')
var nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
dotenv.config();
@Route("users")
export default class UsersController {
  /**
   * Get all of users
   */
  @Get("/")
  public async getUsers(): Promise<IUser[]> {
    return await UsersModel.find();
  }

  /**
   * Get a user details
   * @example userId "63124dffdcf1e4974079a441"
   */
  @Response(404, "The requested user is not found")
  @Get("{userId}")
  public async getUser(userId: string): Promise<IUser | null> {
    return await UsersModel.findById(userId);
  }

  /**
   * Delete a user
   * @example userId "63124dffdcf1e4974079a441"
   */
  @Response(404, "The requested user is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{userId}")
  public async deleteUser(userId: string): Promise<IUser | null> {
    return await UsersModel.findByIdAndDelete(userId);
  }

  /**
   * Create a user
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  @Example<IUser>({
    email: "nour@gmail.com",
    phoneNumber: "00352681531905",
    password: "00352681531905",
    profilePicture: "main.png",
    firstName: "Muhammad",
    lastName: "Nour",
    gender: "male",
    DOB: new Date("2022-09-10"),
    address: [
      {
        country: "Syria",
        government: "SY",
        manipolicity: "Fixed",
      },
    ],
    verified: "notSent",
    status: "active",
    accountType: "EM",
    lastLoginDate: new Date("2022-09-10"),
    accountSetting: { name: "Setting1", value: "Some value" },
    languages: ["AR", "EN"],
    maritalStatus: "single",
  })
  @Post("create")
  public async createUser(@Body() user: IUser): Promise<IUser> {
    return await new UsersModel({ ...user }).save();
  }

  /**
   * Update user
   * @example userId "63124dffdcf1e4974079a441"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() user: Partial<IUser>
  ): Promise<IUser | null> {
    let userDocument = await UsersModel.findById(userId);
    if (userDocument != null) {
      userDocument.email = user.email ?? userDocument.email;
      userDocument.phoneNumber = user.phoneNumber ?? userDocument.phoneNumber;
      userDocument.password = user.password ?? userDocument.password;
      userDocument.profilePicture =
        user.profilePicture ?? userDocument.profilePicture;
      userDocument.firstName = user.firstName ?? userDocument.firstName;
      userDocument.lastName = user.lastName ?? userDocument.lastName;
      userDocument.gender = user.gender ?? userDocument.gender;
      userDocument.DOB = user.DOB ?? userDocument.DOB;
      userDocument.address = user.address ?? userDocument.address;
      userDocument.verified = user.verified ?? userDocument.verified;
      userDocument.status = user.status ?? userDocument.status;
      userDocument.accountType = user.accountType ?? userDocument.accountType;
      userDocument.lastLoginDate =
        user.lastLoginDate ?? userDocument.lastLoginDate;
      userDocument.accountSetting =
        user.accountSetting ?? userDocument.accountSetting;
      userDocument.languages = user.languages ?? userDocument.languages;
      userDocument.maritalStatus =
        user.maritalStatus ?? userDocument.maritalStatus;
      return await userDocument.save();
    }
    return null;
  }
  @Response(404, "{ ok: false, message: messages.returnMessages.NOT_FOUND }")
  @Response(500, '{ ok: false,message: messages.returnMessages.SERVER_ERROR}')
  @SuccessResponse("200", '{ ok: true, message: messages.returnMessages.MAIL_SUCCESS + " " + newPassword.toUpperCase()}')
  @Post("forgetPassword/{email}")
  public async forgetPassword(@Path() email: string ): Promise<any> {
    const user = await UsersModel.findOne({ email })
    console.log(user);
    try {
        if (user) {
            //  user found
            const newPassword = common_methods.generateRandomPassword()
            const hash=await bcrypt.hash(newPassword, 10);
            const updatedUser = await   UsersModel.findOneAndUpdate({ email }, {
                $set: {
                    password: hash
                }
            }, { lean: true })
            console.log(`${newPassword} +++++++++++++++++++++++++++++++++++++++`);
            if (updatedUser) {
                //  password updated successfully
                // common_methods.sendMail(email, newPassword.toUpperCase())
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD_APP
                  }
                });
                
                var mailOptions = {
                  from: process.env.EMAIL,
                  to: email,
                  subject: 'Reset Password: ',
                  text: 'Your New Password is: '+ newPassword
                };
                
                transporter.sendMail(mailOptions, function(error:any, info:any){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                return  newPassword
                ;
            }

        } else {
            //  invalid mail address
            return messages.returnMessages.NOT_FOUND
            
        }
    } catch (error) {
        // return messages.returnMessages.SERVER_ERROR
        return error;
        throw error;
    }
  }

  @SuccessResponse("200", '{ ok: true, message: messages.returnMessages.MAIL_SUCCESS + " " + newPassword.toUpperCase()}')
  @Post("sendCode/{email}")
  public async sendCode(@Path() email: string ): Promise<String> {
   
    try {
            const newPassword = common_methods.generateRandomPassword()
           
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD_APP
                  }
                });
                console.log(email.toString());
                var mailOptions = {
                  from: process.env.EMAIL,
                  to: email,
                  subject: 'Verification Code: ',
                  text: 'Your Verification Cod is: '+ newPassword
                };
                
                transporter.sendMail(mailOptions, function(error:any, info:any){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                return  newPassword
                ;
            

        
    } catch (error:any) {
        // return messages.returnMessages.SERVER_ERROR
        return error.toString();
        throw error;
    }
  }
}

