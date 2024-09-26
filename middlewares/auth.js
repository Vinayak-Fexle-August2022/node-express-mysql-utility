const {getUser} = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next){
    
    const userUid = req.cookies.uid;

    console.log('userUid:', userUid);

    if (!userUid) return res.redirect("/user/signin");
    const user = getUser(userUid);

    if (!user) return res.redirect("/user/signin");

    req.user = user;
    next();
}


module.exports = restrictToLoggedinUserOnly;

