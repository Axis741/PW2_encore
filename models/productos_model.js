const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  nombre_producto: {
    type: String,
    required: [true, "Favor de ingresar el nombre del producto"]
  },

  precio: {
    type: Number,
    required: [true, "Favor de ingresar el precio"],
    min: [0, "El precio no puede ser negativo"]
  },

  descripcion: {
    type: String,
    required: [true, "Favor de ingresar una descripción"]
  },

  img_producto: {
    type: String, // URL o path de la imagen
    default: "no-image.jpg"
  },

  tipo: {
    type: String,
    required: [true, "Favor de especificar el tipo de producto"]
  },

  id_artista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artista",
    required: [true, "Favor de especificar el artista"]
  },

  fecha_creacion: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    enum: ["activo", "eliminado"],
    default: "activo"
  }
});

const Productos = mongoose.model("Productos", productosSchema);

module.exports = Productos;