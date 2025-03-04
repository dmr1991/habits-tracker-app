const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const habitRouter = require('./routes/index');


// Conexión a MongoDB
const dbURI =
  "mongodb+srv://dinamrivera08:IX9bftXvOt8Nh11O@cluster0.bjpkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conectado a MongoDB - habitosApp");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/habits", habitRouter); // Aquí estoy poniendo la ruta de hábitos


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
