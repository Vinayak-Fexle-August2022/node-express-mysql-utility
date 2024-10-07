import { where } from "sequelize";
import { User } from "../db.js";
import { authenticateUser, encryptPassword } from "../utils/encryptDecrypt.js"
import { sendEmail } from "../utils/sendMail.js"
import jwt from "jsonwebtoken";

const secret = process.env.PASS_SEC;


export async function handleLogin(req, res){
    let {email, password} = req.body;
    console.log(req.body);

    let isAuthenticated = false;

    isAuthenticated = await authenticateUser(email, password);

    console.log(isAuthenticated);

    if (!isAuthenticated){
        return res.status(401).json({"response": "incorrect email id or password"});
    }

    return res.status(200).json({"response": "logged in successfully."});
}


export async function handleRegister(req, res){
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json("bad request, Please provide valid data..!");
        }

        let encryptedPwd = await encryptPassword(password);

        // const token = await generateUniqueToken();
        const token = jwt.sign({
            "email": email
        }, secret);

        let user = {
            'name':name, 
            'email': email, 
            'password': encryptedPwd, 
            'token': token
        }

        try {
            const result = await User.create(user);
            let userId = result.dataValues.id;
            let data = {'token': token, user_id: userId};
            return res.status(200).json({"response": "registered successfully"});
        } 
        catch (err) {
            console.error('Error creating user:', err.errors[0].message);
            return res.status(400).json({ error: err.errors[0].message });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({"error": "internal server error"});
    }
}


export async function sendResetPasswordMail(req, res) {
    try{

        const { email } = req.body;

        if (!email) return res.status(400).json({ "error": "Please provide valid email Id" });

        const users = await User.findAll({
            where:{
                email: email
            }
        });
        
        if (users.length == 0){
            return res.status(404).json({ "error": "user not found! please provide registered email id" });
        }
        
        let message = `Hi Please chick on below link to change your password\nClick here http://localhost:3001/auth/resetPassword`;
          
        let emailsent = await sendEmail(email, message);

        console.log(emailsent);

        if (!emailsent) return res.status(500).json({"error":"internal server error"});

        return res.status(200).json({"message": "email sent for change password."});
    }catch(error){
        console.log("error:", err.message);
        return res.status(500).json({"error":"internal server error"});
    }
}


export async function handleResetPassword(req, res) {
    try{
        const { email, new_password, re_new_password } = req.body;

        if (!email || !new_password || !re_new_password){
            return res.status(404).json({ "error": "required fields missing!" });
        }

        if (new_password !== re_new_password){
            return res.status(404).json({"errer": "new password and re_new_password not matched!"});
        }

        const users = await User.findAll({
            where:{
                email: email
            }
        });

        if (users.length === 0) res.status(404).json({"errer": "please enter valid email!"}); 

        const encryptedPwd = await encryptPassword(new_password);

        const user = users[0];
        await user.update({password: encryptedPwd});

        return res.status(200).json({"message": "password changed successfully."});
    }catch(error){
        console.log(err.message);
        return res.status(500).json({"error": "internal server error"});
    }
}


export async function handleChangePassword(req, res) {
    try{
        
        const { email, old_password, new_password } = req.body;

        if (!email || !old_password || !new_password){
            res.status(404).json({"error": "please provide all required fields!"});
        }

        const users = await User.findAll({
            where:{
                email: email
            }
        });

        if (users.length === 0) res.status(404).json({"errer": "please enter valid email!"});

        if (old_password === new_password ){
            res.status(400).json({"error": "old password and new password can not be same!"});
        }

        const encryptedPwd = await encryptPassword(new_password);

        const user = users[0];
        await user.update({password: encryptedPwd});

        return res.status(200).json({"message": "password changed successfully."});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({"error": "internal server error"});
    }



}