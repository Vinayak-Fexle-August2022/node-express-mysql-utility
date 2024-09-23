import express from "express";

const router = express.Router();

router.route("/:name?")
    .get((req, res) => {
        res.send(`Hello ${req.params.name}`);
    })


export default router;
