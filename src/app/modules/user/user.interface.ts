import { Model } from "mongoose";

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  phoneNumber?: string;
  image?: string;
  status: "active" | "delete";
  verified?: boolean;
  fcmToken?: string;
  address: {
    title: string;
    street: string;
    apartmentNumber: string;
    city: string;
    state: string;
    postalCode: string;
  }[];
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  passwordChangedAt?: Date;
};
export type UserModal = {
    isExistUserById(id: string): any;
    isExistUserByEmail(email: string): any;
    isExistUserByPhnNum(phnNum: string): any;
    isMatchPassword(password: string, hashPassword: string): boolean;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number
    ): boolean;
  } & Model<TUser>;
  



  export type TReturnGetAllUsers={
    meta?: {
      page: number;
      limit: number;
      totalPage: number;
      total: number;
    };
    result: TUser[];
  }