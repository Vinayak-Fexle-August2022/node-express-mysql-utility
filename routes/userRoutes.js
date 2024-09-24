import express from "express";
import * as userController from "../controller/userController.js"

const router = express.Router();

router.route("/").post(userController.handleCreateUser);

router.route("/:userId?")
    .get(userController.handleGetUser)
    .delete(userController.handleDeleteUser)
    .patch(userController.handleUpdateUser);




export default router;
