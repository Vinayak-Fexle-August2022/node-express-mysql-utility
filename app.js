const cookieParser = require("cookie-parser");

const express = require("express");

const userRouter = require("./routes/userRoutes.js");
const shopRouter = require("./routes/shopRoutes.js");

const path = require("path");
const bodyParser = require("body-parser");

const restrictToLoggedinUserOnly = require("./middlewares/auth.js")

const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());


app.use('/user', userRouter);
app.use('/shop', restrictToLoggedinUserOnly, shopRouter);

// app.get("/:name?", (req, res) => { 
//     console.log(req);
//     console.log(`Hello ${req.params.name}`); 
//     res.send(`<h1>Hello, ${req.params.name}`);
// });

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})