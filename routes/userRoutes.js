const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.route("/").post(userController.handleCreateUser);

router.route("/:userId?")
    .get(userController.handleGetUser)
    .delete(userController.handleDeleteUser)
    .patch(userController.handleUpdateUser);




module.exports = router;
