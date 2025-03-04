const express = require("express");
const router = express.Router();
const Habit = require("./habits");

// get home page
router.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

// get hello page
router.get("/hello", (req, res, next) => {
  res.json({ message: "Hello Me" });
});

//aca agregare mis endpoints

// Ruta POST para crear un hábito
router.post("/habits", async (req, res) => {
  try {
    const { name, description } = req.body;
    const habit = new Habit({
      name,
      description,
    });
    await habit.save();
    res.status(400).json(habit); // Respuesta con el hábito creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el hábito" });
  }
});

// Eliminar un hábito por ID (DELETE request de https)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findByIdAndDelete(id);
    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }
    res.status(200).json({ message: "Hábito eliminado" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el hábito", error });
  }
});

// Actualizar un hábito por ID (PUT request en https)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  try {
    const habit = await Habit.findByIdAndUpdate(
      id,
      { name, description, completed },
      { new: true }
    );
    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el hábito", error });
  }
});

module.exports = router;
