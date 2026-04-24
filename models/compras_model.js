const mongoose = require("mongoose");

const compraItemSchema = new mongoose.Schema({
  id_variante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductoVariante",
    required: true
  },

  cantidad: {
    type: Number,
    required: true,
    min: 1
  },

  precioUnitario: {
    type: Number,
    required: true
  }
});

const compraSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true
  },

  items: [compraItemSchema],

  total: {
    type: Number,
    required: true
  },

  estado: {
    type: String,
    enum: ["pendiente", "pagado", "enviado", "entregado"],
    default: "pendiente"
  },

  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Compra", compraSchema);