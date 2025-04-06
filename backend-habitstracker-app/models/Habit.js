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
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  lastDone: {
    type: Date,
    default: Date.now,
  },
  days:{
    type:Number,
    default: 1,
  },
  startedAt:{
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Habit", habitSchema);
