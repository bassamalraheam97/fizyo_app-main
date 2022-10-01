import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import ServiceProvidersRoutes from "./routes/service_providers_routes";
import DisputeRoutes from "./routes/dispute_routes";
import CommunicationsRoutes from "./routes/communications_routes";
import AgreementsRoutes from "./routes/agreements_routes";

import UsersRoutes from "./routes/users_routes";
import RolesRoutes from "./routes/roles_route";
import EmployeesRoutes from "./routes/employees_routes";

import ClientsRoutes from "./routes/clients_routes";

import SessionRoute from "./routes/session_routes";
import AnnouncementRoute from "./routes/announcement_routes";
import AlarmRoute from "./routes/alarm_routes";
import NotificationRoute from "./routes/notification_routes";
import EnumRoute from "./routes/enum_routes";
const { validateJWT } = require("./auth/validate_jwt");

const passport = require("passport");
require("./auth/auth");

dotenv.config();

const multer=require('multer')  
const path= require('path')
const model = require('./models/files_model');

const app: Application = express();
const port = process.env.PORT;
const uri: string = process.env.DATABASE_URI ?? "";

mongoose.connect(uri).catch((err: any) => console.log(err));

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log("MongoDB database connection established successfully");
  const ServiceProvidersModel =
    await require("./models/service_providers_model");
  const DisputeModel = require("./models/dispute_model");
  const CommunicationsModel = require("./models/communications_model");
  const AgreementsModel = require("./models/agreements_model");

  const UsersModel = require("./models/users_model");
  const RolesModel = require("./models/roles_model");
  const EmployeesModel = require("./models/employees_model");
  const ClientsModel = require("./models/clients_model");

  const SessionModel = require("./models/sessions_model");
  const AnnouncementModel = require("./models/announcements_model");
  const AlarmModel = require("./models/alarms_model");
  const NotificationModel = require("./models/notifications_model");
  const EnumModel = require("./models/enums_model");
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(passport.initialize());

app.use(validateJWT);
app.use("/sessions", SessionRoute);
app.use("/announcements", AnnouncementRoute);
app.use("/alarms", AlarmRoute);
app.use("/notifications", NotificationRoute);
app.use("/enums", EnumRoute);

app.use("/serviceProviders", ServiceProvidersRoutes);
app.use("/disputes", DisputeRoutes);
app.use("/communications", CommunicationsRoutes);
app.use("/agreements", AgreementsRoutes);

app.use("/users", UsersRoutes);
app.use("/roles", RolesRoutes);
app.use("/employees", EmployeesRoutes);
app.use("/clients", ClientsRoutes);

//=================================================================
app.use('/uploads', express.static(__dirname +'/uploads'));

var storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
      cb(null, 'uploads')
},

filename: function (req:any, file:any, cb:any) {
cb(null, new Date().toISOString()+file.originalname)
}
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single('myFile'), async(req, res, next) => {

const file = req.file
if (!file) {
  const error = new Error('Please upload a file')
  // error.status = 400

  return next("hey error")
}

const filepost= new model({
file: file.path
})

const savedfile= await filepost.save()
res.json(savedfile)

})

app.get('/file',async(req, res)=>{
 const file = await model.find()
 res.json(file)

})


//=================================================================


app.get("/", (req: Request, res: Response) => {
  res.send(
    "<div style='background-color:#00ff105e;display: flex;height: 100%;width: 100%;font-size: xxx-large;font-family: arial;text-align: center;justify-content: center;'><div style='display: inline-block;top: 50%;position: absolute;'>Hello World!</div></div>"
  );
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
