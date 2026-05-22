const mongoose = require("mongoose");

const compraItemSchema = new mongoose.Schema({

  id_variante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductoVariante",
    required: true
  },

  id_producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productos",
    required: true
  },

  id_artista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artistas",
    required: true
  },

  nombre_producto: {
    type: String,
    required: true
  },

  nombre_artista: {
    type: String,
    required: true
  },

  talla: {
    type: String
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
    enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },

  fecha: {
    type: Date,
    default: Date.now
  }
});

compraSchema.index({ id_usuario: 1 });
compraSchema.index({ fecha: -1 });
compraSchema.index({ "items.id_artista": 1 });

module.exports = mongoose.model("Compra", compraSchema);