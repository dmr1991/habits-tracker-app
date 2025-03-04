const express = require("express");
const mongoose = require("mongoose");

// Definición del modelo de hábito *es como crear la cosa en el jsx para entender mas facil*
const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Habit = mongoose.model("Habit", habitSchema);
