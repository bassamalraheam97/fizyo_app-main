import { Types } from "mongoose";
export interface ISession {
  _id?: Types.ObjectId | string;
  sessionType: "group" | "individual"; //enum
  serviceProviderID?: string | Types.ObjectId | IServiceProvider;
  clientsID?: string[] | Types.ObjectId[] | IClient[];
  name: string;
  details?: string;
  startDate?: Date;
  duration?: number;
  serviceType: "online" | "home" | "office"; //enum
  location: object;
  attachments?: {
    url: string;
    name: string;
    type: string;
  }[];
  requirements: string;
  ratings?: {
    raterUID: string | Types.ObjectId | IUser;
    ratingValue: string;
    ratingDate: Date;
  }[];
  reviews?: {
    reviewerUID: string | Types.ObjectId | IUser;
    reviewDetails: string;
    reviewDate: Date;
  }[];
  sessionFee: number;
  payments?: {
    discount: number;
    paymentMethod: string;
    payerID: string | Types.ObjectId | IUser;
    amount: number;
  }[];
  status: "initiated" | "agreed" | "canceled" | "finished"; //enum
  doctorReferral?: string;
  url?: string;
}

export interface IAnnouncement {
  _id?: Types.ObjectId | string;
  referenceType: "Session" | "Advertisement"; //enum
  referenceID?: string | ISession | INotification;
  status: "draft" | "published"; //enum
  topic: string;
  details: string;
  sentDate?: Date;
  attachments: {
    attachmentUrl: string;
    attachmentName: string;
    attachmentType: string;
  }[];
  receiversUIDs?: string[] | Types.ObjectId[] | IUser[];
  url?: string;
}
export interface IAlarm {
  _id?: string | Types.ObjectId;
  name: string;
  referenceType: "Agreement" | "Session" | "Dispute" | "ServiceProvider"; //enum
  referenceID: string | IAgreement | ISession | IDispute | IServiceProvider;
  frequencyUnit: "Days" | "Hours"; //enum
  frequency: number;
  active: boolean;
  startDate: Date;
  endDate: Date;
}
export interface INotification {
  _id?: Types.ObjectId | string;
  referenceType:
    | "Session"
    | "Agreement"
    | "Dispute"
    | "Alarm"
    | "Announcement"
    | "User"
    | "Communication"; //enum
  referenceID:
    | string
    | ISession
    | IAgreement
    | IDispute
    | IAlarm
    | IAnnouncement
    | IUser
    | ICommunication;
  status: "sent" | "delivered" | "opened"; //enum
  title: string;
  details: string;
  sentDate: Date;
  receivedDate?: Date;
  openDate?: Date;
  receiverUID: string | Types.ObjectId | IUser;
}

export interface IEnumValues {
  _id?: Types.ObjectId | string;
  name: string;
  values: string[];
  note: string;
}

export interface IServiceProvider {
  _id?: Types.ObjectId | string;
  uID?: string | Types.ObjectId | IUser;
  bio?: string;
  specialties: string[];
  // Example on string[] enum
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  // Example on number
  minSessionFee?: number;
  maxSessionFee?: number;
  // Example on object with attributes
  documents?: { url: string; name: string; type: string }[];
  // Example on string[] of foreign keys
  reviewerUIDs?: string[] | Types.ObjectId[] | IUser[];
  // Example on enum
  verificationStatus:
    | "notSubmitted"
    | "pendingReview"
    | "inReview"
    | "verified"
    | "rejected";
  // Example on date
  verificationDate?: Date;
  verifiedByUID?: string | Types.ObjectId | IUser;
  url?: string;
}

export interface IDispute {
  _id?: Types.ObjectId | string;
  sessionID?: string | Types.ObjectId | ISession;
  firstPartyUID?: string | Types.ObjectId | IUser;
  secondUID?: string | Types.ObjectId | IUser;
  topic: string;
  details: string;
  attachments?: { url: string; name: string; disType: string }[]; // name, url, type
  status:
    | "sent"
    | "received"
    | "in-progress"
    | "suspended"
    | "rejected"
    | "resolved";
  resolverUID?: string | Types.ObjectId | IUser;
  inProgressDate?: Date;
  receivedDate?: Date;
  suspendedDate?: Date;
  closedDate?: Date;
  url?: string;
}

export interface ICommunication {
  _id?: string | Types.ObjectId;
  referenceType: "Agreement" | "Session" | "Dispute" | "User";
  referenceID?:
    | string
    | Types.ObjectId
    | ISession
    | IAgreement
    | IDispute
    | IUser;
  partiesUIDs?: string[] | Types.ObjectId[] | IUser[];
  lastUpdate: Date;
  // Example on object[] with attributes
  messages: {
    messageType: string;
    messageContent: string;
    senderUID: string | Types.ObjectId | IUser;
    sendDate: Date;
    deliveryDetails: object[];
  }[];
  url?: string;
}

export interface IAgreement {
  _id?: string | Types.ObjectId;
  name: string;
  parties: string[];
  startDate: Date;
  endDate: Date;
  details: string;
  attachments?: { url: string; name: string; disType: string }[];
  reminder?: boolean;
  url?: string;
}

export interface IClient {
  _id?: string | Types.ObjectId;
  uID?: string | Types.ObjectId | IUser;
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  diseases: string[];
  preferences: object;
  url?: string;
}

export interface IUser {
  _id?: Types.ObjectId | string;
  email?: string;
  phoneNumber?: string;
  password: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female"; // Enum
  DOB: Date;
  address?: {
    country: string;
    government: string;
    manipolicity: string;
  }[];
  verified: "notSent" | "pending" | "verified";
  status: "inActive" | "active" | "suspended" | "lost" | "deleted";
  accountType: "PT" | "EM" | "PA";
  lastLoginDate?: Date;
  accountSetting?: object;
  languages?: string[];
  maritalStatus: "married" | "single" | "divorced" | "widow";
  url?: string;
}

export interface IRole {
  _id?: string | Types.ObjectId;
  name: string;
  employees: string[];
  users: string[];
  service_provider?: string[];
  clients: string[];
  sessions: string[];
  communications: string[];
  disputes: string[];
  enum_values: string[];
}

export interface IEmployee {
  _id?: string | Types.ObjectId;
  uID?: string | Types.ObjectId | IUser;
  //user: PopulatedDoc<IUsers & Document>;
  roleID?: string | Types.ObjectId | IRole;
  //role: PopulatedDoc<IRoles & Document>;
  salary?: number;
  attachments?: {
    name: string;
    url: string;
    empType: string;
  }[];
  url?: string;
}
