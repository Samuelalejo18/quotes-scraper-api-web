
require("dotenv").config(); // Habilitar el uso de variables de entorno
const { PORT } = process.env;
const server = require("./src/app.js");


server.listen(PORT, () => {
    console.log(
        "Server successfully started on port at " + PORT
    );
  
});
