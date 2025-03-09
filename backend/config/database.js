// aca hago la conexion de mongoose con la base de datos
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully to Database habitosApp");
  })
  .catch((err) => {
    console.log("Error connecting to the habitosApp database: ");
    console.log(err);
  });

module.exports = mongoose;
