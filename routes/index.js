const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit"); // Incluyo esto para acceder a este archivo del habit.

// GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET habits page
router.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving habits page." });
  }
});

//aca agregare mis endpoints solicitados para agregar, editar y borrar habitos

// POST para crear un hábito (endpoint post)
router.post("/habits", async (req, res) => {
  try {
    const { title, description } = req.body;
    const habit = new Habit({
      title,
      description,
    });
    await habit.save();
    res.json(habit); // Respuesta con el hábito creado
  } catch (err) {
    res.status(400).json({ message: "Error creating habit." });
  }
});

// Eliminar un hábito por ID (DELETE request de https)
router.delete("/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit Deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error, habit not found." });
  }
});

// Editar un hábito por ID (PUT request de https)
router.put("/habits/:id", async (req, res) => {
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

module.exports = router;
