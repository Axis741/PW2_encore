const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  foto: String,
  estado: {
    type: String,
    enum: ["activo", "eliminado"],
    default: "activo"
  }
});

module.exports = mongoose.model("Artista", artistaSchema);