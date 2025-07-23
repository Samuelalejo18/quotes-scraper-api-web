const mysql = require('mysql2/promise');
const connectDB = require("../database/dataBaseConnection.js");
async function createTablesDB() {
    const connection = await connectDB();


    await connection.query(`CREATE DATABASE IF NOT EXISTS scraping`);
    await connection.query(`USE scraping`);

    const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS author (
            id_author INT AUTO_INCREMENT PRIMARY KEY,
            name_author VARCHAR(100) NOT NULL  UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS quote (
            id_quote INT AUTO_INCREMENT PRIMARY KEY,
            quote_text VARCHAR(750) NOT NULL UNIQUE,
            id_author INT ,
            FOREIGN KEY (id_author) REFERENCES author(id_author)
                ON DELETE SET NULL
                ON UPDATE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tag (
            id_tag INT AUTO_INCREMENT PRIMARY KEY,
            name_tag VARCHAR(40) NOT NULL  UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS quote_tag (
            id_quote INT,
            id_tag INT,
            PRIMARY KEY (id_quote, id_tag),
            FOREIGN KEY (id_quote) REFERENCES quote(id_quote)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            FOREIGN KEY (id_tag) REFERENCES tag(id_tag)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        );
    `;

    await connection.query(createTablesSQL);


    await connection.end();
}

module.exports = createTablesDB;