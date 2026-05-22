const mongoose = require("mongoose");
const usuariosSchema = new mongoose.Schema({
  usuario: {
    type: String,
    unique: true,
    required: [true, "Favor de ingresar un usuario"]
  },
  contrasena: {
    type: String,
    required: [true, "Favor de ingresar una contraseña"]
  },
  nombre: {
    type: String,
    required: [true, "Favor de ingresar su nombre"]
  },
  fecha_nac: {
    type: Date,
    required: [true, "Favor de ingresar su fecha de nacimiento"]
  },
  imagen: {
    type: String,
    required: [true, "Favor de seleccionar una foto de perfil"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const Usuarios = mongoose.model("Usuarios", usuariosSchema);

module.exports = Usuarios;
