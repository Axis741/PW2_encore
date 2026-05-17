const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
  id_artista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artista",
    required: [true, "Favor de especificar el artista"]
  },

  tour: {
    type: String,
    required: [true, "Favor de ingresar el nombre del tour"]
  },

  presentaciones: {
    type: String, 
    required: [true, "Favor de ingresar las presentaciones"]
  },

  imagen: {
    type: String,
    default: "no-image.jpg"
  },

  estado: {
    type: String,
    enum: ["activo", "cancelado", "finalizado"],
    default: "activo"
  },

  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Evento", eventoSchema);