import { Sequelize } from 'sequelize';
import { createUserModel } from './models/user.js'; // Adjust the path as needed

const database = new Sequelize(
    'employees', 
    'root', 
    '@Vasu001', {
    host: 'localhost',
    dialect: 'mysql'
});

// Create the User model
const User = createUserModel(database);

// Function to connect to the database
const dbConnection = async () => {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
        
        // Sync the models
        await database.sync();
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { dbConnection, User }; // Export sequelize and User for use in other files













// import sequelize from 'sequelize';
// import { createUserModel } from './models/user.js';
// import 'dotenv/config';


// import { Sequelize } from '@sequelize/core';
// import { MySqlDialect } from '@sequelize/mysql';


// const database = new Sequelize(
//     process.env.DB_NAME, 
//     process.env.DB_USER, 
//     process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: MySqlDialect
// });


// const database = new Sequelize({
//     dialect: MySqlDialect,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     port: 3306,
// });

// let UserModel = null;

// const db_connection = async()=> {
//     try{
//         await database.authenticate();
//         console.log('Connection has been established successfully.');

//         UserModel = await createUserModel(database);

//         await database.sync();

//         console.log('database synced...');

//     }
//     catch(err) {
//         console.error('Unable to connect to the database:', err);
//     } 
// }

// export{
//     db_connection,
//     UserModel
// }



