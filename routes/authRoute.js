import Router from "express";
import { handleLogin, handleRegister } from "../controller/authController.js";

const router =  Router();

router.route("/login").post(handleLogin);
router.route("/register").post(handleRegister);
// router.route("forget-password");
// router.route("change-password");

export { router };