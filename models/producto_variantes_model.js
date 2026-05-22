const mongoose = require("mongoose");

const productoVarianteSchema = new mongoose.Schema({
  id_producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productos",
    required: true
  },

  talla: {
    type: String,
    default: null
  },

  stock: {
    type: Number,
    required: true,
    min: [0, "El stock no puede ser negativo"]
  }
});

module.exports = mongoose.model("ProductoVariante", productoVarianteSchema);