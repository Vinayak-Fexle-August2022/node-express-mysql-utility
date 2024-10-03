import { User } from "../db.js";
import { randomBytes as _randomBytes } from 'crypto';
import { Op } from 'sequelize';


async function generateUniqueToken() {
    const timestamp = Date.now();
    const paddedTimestamp = String(timestamp).padStart(16, '0');
    const randomBytes = _randomBytes(8).toString('base64').replace(/=/g, '');
    const token = `${paddedTimestamp}-${randomBytes}`;
    return Buffer.from(token).toString('base64');
}


export async function handleGetUser(req, res){
    try{
        const userId = req.params.userId;
        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        const users = await User.findAll({
            where: {
                Id: {
                    [Op.eq]: userId,
                },
            },
        });

        if (users.length <= 0){
            return res.status(404).json("user not found..!");
        }
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


export async function handleCreateUser(req, res){
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json("bad request, Please provide valid data..!");
        }

        const token = generateUniqueToken();
        let user = {
            'name':name, 
            'email': email, 
            'password': password, 
            'token': token
        }

        try {
            const result = await User.create(user);
            let userId = result.dataValues.id;
            let data = {'token': token, user_id: userId};
            return res.status(200).json(data);
        } 
        catch (err) {
            console.error('Error creating user:', err.errors[0].message);
            return res.status(400).json({ error: err.errors[0].message });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


export async function handleDeleteUser(req, res){
    try{
        const userId = req.params.userId
        if (!userId){
            return res.status(404).json("please provide user Id...");
        }
        try{
            const result = await User.destroy({
                where: {
                    Id: {
                        [Op.eq]: userId,
                    },
                },
            });

            return res.status(200).json({'message':`${result} user with Id ${userId} deleted.`});
        }
        catch (err) {
            console.error('Error creating user:', err.errors[0].message);
            return res.status(400).json({ error: err.errors[0].message });
        } 
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


export async function handleUpdateUser(req, res){
    try{
        const userId = req.params.userId;
        const data = req.body;

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        const users = await User.findAll({
            where: {
                Id: {
                    [Op.eq]: userId,
                },
            },
        });

        console.log('rows count:', users.length)

        if (users.length <= 0){
            return res.status(404).json("please provide valid user Id...");
        }

        let data_to_update = {}
        
        for (let field in data){
            if (data[field]){
                data_to_update[field] = data[field];
            }
        }

        const result = await User.update(
            data_to_update,
            {
              where: {
                id: userId,
              },
            },
          );

        if (result[0] > 0){
            return res.status(200).json("record updated successfully.");
        }
        else{
            return res.status(404).json("update failed, please check your data...");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


