const mongoose = require("mongoose");

const tipoProductoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("TipoProducto", tipoProductoSchema);