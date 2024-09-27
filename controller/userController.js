const pool = require("../db.js");

const crypto = require('crypto');

function generateUniqueToken() {
    const timestamp = Date.now();
    const paddedTimestamp = String(timestamp).padStart(16, '0');
    const randomBytes = crypto.randomBytes(8).toString('base64').replace(/=/g, '');
    const token = `${paddedTimestamp}-${randomBytes}`;
    return Buffer.from(token).toString('base64');
}


async function handleGetUser(req, res){
    try{
        const userId = req.params.userId

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        let sql = `SELECT * FROM user WHERE id = ${userId}`;

        const [rows] = await pool.query(sql);

        console.log(rows);

        if (rows.length <= 0){
            return res.status(404).json("user not found..!")
        }

        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


async function handleCreateUser(req, res){
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json("bad request, Please provide valid data..!");
        }

        const token = generateUniqueToken();
        console.log(token);

        let sql =  `INSERT INTO user (name, email, password, token) VALUES ('${name}', '${email}', '${password}', '${token}')`;

        const result = await pool.query(sql)
        .then(([ result ]) => {
            console.log(result);
            userId = result.insertId;
            let data = {'token': token, user_id: userId};
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(401).json(error.message);
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


async function handleDeleteUser(req, res){
    try{
        const userId = req.params.userId
        console.log(`delete user with Id: ${userId}`)

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        let sql = `DELETE FROM user WHERE Id = ${userId}`

        const result = await pool.query(sql);

        if (result[0].affectedRows > 0){
            return res.status(200).json("record deleted successfully.");
        }
        else{
            return res.status(404).json("please provide valid user Id...");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


async function handleUpdateUser(req, res){
    try{
        const userId = req.params.userId;
        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        // check if user is present or not
        let users = [];
        let sql = `SELECT name FROM user WHERE Id=${userId}`;

        const rows = await pool.query(sql);
        if (rows.length > 0){
            users = rows
        }
        else{
            return res.status(404).json("please provide valid user Id...");
        }

        const data = req.body;

        sql = `UPDATE user SET `
        for (let field_data in data){
            if (data[field_data]){
                sql += `${field_data}='${data[field_data]}', `;
            }
        }

        /* removing quama and white space character 
        present at start and end of the string*/
        sql = sql.replace(/,\s*$/, "");

        sql += ` WHERE Id=${userId}`;
        console.log(sql);

        const result = await pool.query(sql);

        if (result[0].affectedRows > 0){
            return res.status(200).json("record updated successfully.");
        }
        else{
            return res.status(404).json("please provide valid user Id...");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


module.exports = {
    handleGetUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser
}

