export type ICreateAccount = {
  name: string;
  email: string | undefined;
  otp: number;
};

export type IResetPassword = {
  email: string | undefined;
  name?: string;
  otp: number;
};
