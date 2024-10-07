import Router from "express";
import { handleLogin, 
         handleRegister, 
         handleResetPassword, 
         sendResetPasswordMail,
         handleChangePassword
       } from "../controller/authController.js";

const router =  Router();

router.route("/login").post(handleLogin);
router.route("/register").post(handleRegister);
router.route("/email-forget-password").post(sendResetPasswordMail);
router.route("/resetPassword").post(handleResetPassword);
router.route("/change-password").post(handleChangePassword);

export { router };
