import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from "../db.js";
import "dotenv/config";

const secret = process.env.PASS_SEC;

export async function restrictToAuthorisedUserOnly(req, res, next) {
    try{
        const authToken = req.headers.authorization?.split(" ")[1];
        let user;

        if (!authToken) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        try{
            user = jwt.verify(authToken, secret);
        }catch(error){
            return res.status(401).json({"response":"Unauthorized Access"});
        }

        const email = user.email;

        const users = await User.findAll({
            where: {
                token: authToken,
                email: email
            }
        });

        if (users.length <= 0){
            return res.status(401).json({"response":"Unauthorized Access"});
        }

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
