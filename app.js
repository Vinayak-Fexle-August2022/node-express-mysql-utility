import express from "express";
import bodyParser from "body-parser";

import userRouter from "./routes/userRoutes.js"
import { connectDatabase } from "./settings.js";


const app = express();
const PORT = 3001;

connectDatabase();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);

// app.get("/:name?", (req, res) => { 
//     console.log(req);
//     console.log(`Hello ${req.params.name}`); 
//     res.send(`<h1>Hello, ${req.params.name}`);
// });

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})