
const mongoose = require("mongoose");

// Definición del modelo de hábito *es como crear la cosa en el jsx para entender mas facil*
const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type:  Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Habit", habitSchema);
