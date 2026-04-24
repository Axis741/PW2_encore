const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  foto: String
});

module.exports = mongoose.model("Artista", artistaSchema);