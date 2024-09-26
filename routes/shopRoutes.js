const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();


router.route("/").get((req, res) => {
    res.send("<center><h1>Hello, welcome to my shop</h1></center>");
});


module.exports = router;