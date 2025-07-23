const express = require("express");
const server = express();
const cors = require("cors");
const createTablesDB = require("./models/tables.js");
const router = require("./routes/scraping.routes.js");

const saveDataToDB= require("./service/scraping/scraping.saveData.js");
// Middlewares
server.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

createTablesDB();
saveDataToDB();

server.use("/", router);

module.exports = server;