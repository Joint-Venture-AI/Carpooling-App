import { Model, Types } from "mongoose";

export type TCarpool = {
  role: "Attend"|"Drive";
  user:Types.ObjectId;
  childrens:Types.ObjectId[];
  startLocation:string;
  endLocation:string;
  whenStatus:"Does not repeat"|"Daily"| "Every Week"| "Custom";
  


};
export type CarpoolModal = {
  isExistCarpoolById(id: string): any;
  isExistCarpoolByEmail(email: string): any;
  isExistCarpoolByPhnNum(phnNum: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
} & Model<TCarpool>;

export namespace TReturnCarpool {
  export type Meta = {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };

  export type getAllCarpool = {
    result: TCarpool[];
    meta?: Meta;
  };

  export type getSingleCarpool = TCarpool
  export type updateCarpool = TCarpool
  export type updateCarpoolActivationStatus = TCarpool

  export type updateCarpoolRole =TCarpool

  export type deleteCarpool =TCarpool
}
