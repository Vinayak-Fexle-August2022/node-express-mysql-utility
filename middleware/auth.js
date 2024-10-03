import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserModel } from "../db.js";

async function restrictToAuthorisedUserOnly(req, res, next) {
    const authToken = req.headers.authorization?.split(" ")[1];

    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    
    const sql = `SELECT * FROM user WHERE token = ?`;

    try {
        const [rows] = await query(sql, [authToken]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        
        console.log(user);
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export default restrictToAuthorisedUserOnly;