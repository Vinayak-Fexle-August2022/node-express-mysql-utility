import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import { dbConnection } from './db.js';


// settings
const app = express();
const PORT = 3001;


// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnection();

// routes
app.use('/users', userRouter);


// listning app on given port 
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
