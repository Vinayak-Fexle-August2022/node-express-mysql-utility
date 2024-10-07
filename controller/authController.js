import { User } from "../db.js";
import { authenticateUser, encryptPassword } from "../utils/encryptDecrypt.js"
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