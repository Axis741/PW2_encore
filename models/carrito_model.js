const mongoose = require("mongoose");

const carritoItemSchema = new mongoose.Schema({
  id_variante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductoVariante",
    required: true
  },

  cantidad: {
    type: Number,
    required: true,
    min: 1
  }
});

const carritoSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true
  },

  items: [carritoItemSchema],

  fecha_mod: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Carrito", carritoSchema);