import express, { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { USER_ROLES } from "../user/user.constant";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.createLoginZodSchema),
  AuthController.loginUser
);
router.post("/refresh-token", AuthController.newAccessToken);
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.createForgetPasswordZodSchema),
  AuthController.forgetPassword
);
router.post(
  "/verify-email",
  validateRequest(AuthValidation.createVerifyEmailZodSchema),
  AuthController.verifyEmail
);
router.post(
  "/reset-password",
  validateRequest(AuthValidation.createResetPasswordZodSchema),
  AuthController.resetPassword
);
router.delete(
  "/delete-account",
  // auth(USER_ROLES.USER),
  AuthController.deleteAccount
);
router.post(
  "/change-password",
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  validateRequest(AuthValidation.createChangePasswordZodSchema),
  AuthController.changePassword
);
export const AuthRoutes: Router = router;
