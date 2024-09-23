import express from "express";
import userRouter from "./routes/userRoutes.js"

const app = express();
const PORT = 3001;

app.use('/', userRouter);

// app.get("/:name?", (req, res) => { 
//     console.log(req);
//     console.log(`Hello ${req.params.name}`); 
//     res.send(`<h1>Hello, ${req.params.name}`);
// });

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})