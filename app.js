import express from "express";
import bodyParser from "body-parser";

import { router as userRouter } from "./routes/userRoutes.js";
import { router as authRouter } from "./routes/authRoute.js"

import { dbConnection } from './db.js';
import { restrictToAuthorisedUserOnly } from "./middleware/auth.js"


// settings
const app = express();
const PORT = 3001;


// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnection();

// routes
app.use('/auth', authRouter);
app.use('/users', restrictToAuthorisedUserOnly, userRouter);

// listning app on given port 
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
