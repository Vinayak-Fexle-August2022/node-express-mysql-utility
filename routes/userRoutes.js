import Router from "express";
import * as userController from "../controller/userController.js";

const router = Router();

router.route("/create").post(userController.handleCreateUser);
router.route("/get/:userId?").get(userController.handleGetUser);
router.route("/delete/:userId?").delete(userController.handleDeleteUser);
router.route("/edit/:userId?").patch(userController.handleUpdateUser);

export default router;
