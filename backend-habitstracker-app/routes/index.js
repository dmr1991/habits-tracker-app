const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit"); // Incluyo esto para acceder a este archivo del habit.
const jwt = require("jsonwebtoken"); // importo la libreria de jsonwebtoken
const mongoose = require("mongoose"); // importo la libreria de mongoose para hacer la referencia al objectID

// hago constante para la funcion de middleware para evaluar peticiones al backend que tenga jwt
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization"); //obtengo el token del header de la peticion
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token not provided." });
  }
  try {
    const tokenWithoutBearer = token.replace("Bearer ", ""); //eliminamos el Bearer del token
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET); //verificamos el token
    req.user = verified; //guardamos el token verificado en la request es decir los datos del usuario
    next(); //llamamos al siguiente middleware o digamos para seguir el flujo
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

// GET home page
router.get("/", function (req, res, next) {
  res.json({ title: "Express" });
});

// GET habits page
router.get("/habits", authenticateToken, async (req, res) => {
  try {
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: "Error retrieving habits." });
    const habits = await Habit.find({"userId": new mongoose.Types.ObjectId(userId)});
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving habits page." });
  }
});

//aca agregare mis endpoints solicitados para agregar, editar y borrar habitos

// POST para crear un hábito (endpoint post)
router.post("/habits", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    let userId =
      req.user && req.user.userId
        ? req.user.userId
        : res.status(500).json({ message: "Error adding habit." });
    userId = new mongoose.Types.ObjectId(userId);
    const habit = new Habit({ title, description, userId});
    await habit.save();
    res.json(habit); // Respuesta con el hábito creado
  } catch (err) {
    res.status(400).json({ message: "Error creating habit." });
  }
});

// Eliminar un hábito por ID (DELETE request de https)
router.delete("/habits/:id", authenticateToken, async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit Deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error, habit not found." });
  }
});

// Editar un hábito por ID (PUT request de https)
router.put("/habits/:id", authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id, //es el ID que obtengo del URL
      req.body,
      { new: true }
    );
    if (!habit) res.status(404).json({ message: "Habit not found." });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error editing the habit." });
  }
});

///incorporando funcionalidad de progreso
router.patch("/habits/markasdone/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdate) < 24) {
      habit.days = 1 + timeDifferenceInDays(habit.lastDone, habit.startedAt);
      habit.lastUpdate = new Date();
      habit.save();
      res.status(200).json({ message: "Habit marked as done." });
    } else {
      habit.days = 1;
      habit.lastUpdate = new Date();
      habit.save();
      res.status(200).json({ message: "Habit restarted." });
    }
  } catch (err) {
    res.status(500).json({ message: "Habit not found" });
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return differenceMs / (1000 * 60 * 60);
};
const timeDifferenceInDays = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
};
module.exports = router;
