import CryptoJS from "crypto-js";
import { User } from "../db.js"
import { Op } from "sequelize";
import "dotenv/config";


export async function encryptPassword(password){
    if(!password) return console.error("please provide valid password");

    console.log("pass Key:", process.env.PASS_SEC);
    
    const doc = CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC
      ).toString()
    
    return doc;
}

export async function authenticateUser(email, password){

    const user = await User.findOne({
        where:{
            email:{
                [Op.eq]: email
            }
        }
    });

    if (!user) return false;

    console.log("user:", user);

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    console.log("decrepted password:", originalPassword);

    if (password !== originalPassword) return false; 

    return true;
}
