import { Model, Types } from "mongoose";

export type TMessage = {
 sender:Types.ObjectId;
 receiver:Types.ObjectId;
    message?: string;
    image?: string;
isRead?: boolean;
 createAt: Date;
 updateAt: Date;

};
export type MessageModal = {
  isExistMessageById(id: string): any;
  isExistMessageByEmail(email: string): any;
  isExistMessageByPhnNum(phnNum: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
} & Model<TMessage>;

export namespace TReturnMessage {
  export type Meta = {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };

  export type getAllMessage = {
    result: TMessage[];
    meta?: Meta;
  };

  export type getSingleMessage = TMessage
  export type updateMessage = TMessage
  export type updateMessageActivationStatus = TMessage

  export type updateMessageRole =TMessage

  export type deleteMessage =TMessage
}
