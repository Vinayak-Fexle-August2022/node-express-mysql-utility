const db = require('../settings.js');
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../service/auth.js');

async function handleUserLogin(req, res){
    let login_data = req.body;
    let email = login_data['email'];
    let password = login_data['password'];
    console.log(email, password);

    if (!email || !password){
        return res.redirect('/user/signin?e=' + encodeURIComponent('Incorrect username or password'));
    }

    console.log('quering the user data..');

    const sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    let user_data = [];
    await db.execute(sql).spread(function (user) {
        user_data = user;
    });
    
    if (user_data.length <= 0){
        return res.redirect('/user/signin?e=' + encodeURIComponent('Incorrect username or password'));
    }

    const sessionId = uuidv4();
    setUser(sessionId, user_data[0]);
    res.cookie('uid', sessionId);
    res.redirect('/shop');
    
}


// create user while registration
async function handleUserSignup(req, res){
    try{
        const data = req.body;
        if (!data.name || !data.email || !data.password){
            return res.status(400).json("bad request, Please provide valid data..!")
        }

        let sql =  `INSERT INTO user (name, email, password) VALUES ('${data.name}', '${data.email}', '${data.password}')`;

        await db.execute(sql).spread(function(err) {
            if(err){
                console.log("Error",err);
            }else{
                console.log("user created successfully.");
            }
        });
        res.redirect("/shop");
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


async function handleGetUser(req, res){
    try{
        const userId = req.params.userId

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        let sql = `SELECT * FROM user WHERE id = ${userId}`;

        db.query(sql, function(err, result, fields){
            if(err){
                console.log(err);
            }
            else{
                if (result.length <= 0){
                    return res.status(404).json("user not found..!")
                }
                res.status(200).json(result);
            }
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}


function handleDeleteUser(req, res){
    try{
        const userId = req.params.userId
        console.log(`delete user with Id: ${userId}`)

        if (!userId){
            return res.status(404).json("please provide user Id...");
        }

        let sql = `DELETE FROM user WHERE Id = ${userId}`

        connection.query(sql, function(err){
            if (err){
                return res.status(404).json("please provide user Id...");
            }
            else{
                return res.status(200).json("user deleted successfully.");
            }
        })
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
        connection.query(sql, (err, result) => {
            if (err){
                console.log(err);
                return res.status(500).json("internal server error");
            }
            users = result;
        });

        console.log(users);
        if (!users || users.length <= 0){
            return res.status(404).json("user with given Id doesn't exists");
        }

        const data = req.body;

        sql = `UPDATE user SET `;
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

        connection.query(sql, function(err){
            if (err){
                console.log(err);
                return res.status(500).json("internal server error");
            }
            else{
                return res.status(200).json("record updated successfully");
            }
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}

module.exports = {
    handleUserLogin,
    handleGetUser,
    handleUserSignup,
    handleDeleteUser,
    handleUpdateUser
}