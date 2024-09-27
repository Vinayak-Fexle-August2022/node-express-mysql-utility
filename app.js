const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes.js");
const auth = require("./middleware/auth.js")
const Unless = require('express-unless');


// settings
const app = express();
const PORT = 3001;

// middlewares
auth.unless = Unless.unless;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.unless({ path: ['/user/'] }));

// routes
app.use('/user', userRouter);

// listning app on given port 
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
