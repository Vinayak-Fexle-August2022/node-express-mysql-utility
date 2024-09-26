const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.route("").get((req, res) => {
    res.render("index.ejs");
});

router.route("/signup").get((_, res) => {
    return res.render("sign_up.ejs");
});

router.route("/signin").get((_, res) => {
    return res.render("sign_in.ejs");
});


router.route("/signup").post(userController.handleUserSignup);
router.route("/signin").post(userController.handleUserLogin);

router.route("/:userId?")
    .get(userController.handleGetUser)
    .delete(userController.handleDeleteUser)
    .patch(userController.handleUpdateUser);


module.exports = router;
