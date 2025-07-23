// database/dataBaseConnection.js

const mysql = require('mysql2/promise'); // ← usa el módulo correcto
require('dotenv').config();

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true, 
        });

       
        return connection;
    } catch (err) {
        console.error(" Database connection failed:", err);
        throw err;
    }
}

module.exports = connectDB;
