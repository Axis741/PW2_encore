const usersModel = require('../models/users_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { error } = require('console');

const borrarImagen = (file) => {

  if(file){

    const rutaImagen = path.join(
      __dirname,
      "../uploads",
      file.filename
    );

    fs.unlink(rutaImagen, (err) => {
      if(err){
        console.error("Error al borrar imagen:", err);
      }
    });

  }

};

exports.getUsers = async (req, res) => {
  const users = await usersModel.find();
  res.status(200).json({ success: true, count: users.length, data: users});
};

//-------------CREATE--------------
exports.createUser = async (req, res) => {
  try{
    const{
      nombre,
      fecha_nac,
      usuario,
      contrasena
    } = req.body;

    //validar si ya existe el usuario
    const usuarioExiste = await usersModel.findOne({usuario});

    if(usuarioExiste){

      borrarImagen(req.file);

      return res.status(400).json({
        success: false,
        message: "El usuario ya existe"
      });
    }

    // PASSWORD
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if(!regexPassword.test(contrasena)){
      borrarImagen(req.file);
      
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener minimo 8 caracteres, una mayúscula, un número y un carácter especial"
      });
    }

    const cycles = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.contrasena, cycles);

    const existenUsuarios = await usersModel.findOne();

    const admin = !existenUsuarios;

    const nuevoUsuario = await usersModel.create({
      nombre: req.body.nombre,
      fecha_nac: req.body.fecha_nac,
      usuario: req.body.usuario,
      contrasena: hashedPassword,
      imagen: req.file ? req.file.filename : null,
      isAdmin: admin
    });

    res.status(201).json({
      success: true,
      data: nuevoUsuario
    });
  }catch(error){
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//-------------LOGIN--------------
exports.loginUser = async (req, res) => {
  try{
    const {usuario, contrasena} = req.body;

    const usuarioEncontrado = await usersModel.findOne({usuario});

    if(!usuarioEncontrado){
      return res.status(400).json({success: false, message: "Usuario o contraseña incorrectos"});
    }

    const isValid = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if(!isValid){
      return res.status(400).json({ success: false, message: "Usuario o contraseña incorrectos"});
    }

    const token = jwt.sign({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      usuario: usuarioEncontrado.usuario,
      fecha_nac: usuarioEncontrado.fecha_nac,
      imagen: usuarioEncontrado.imagen,
      isAdmin: usuarioEncontrado.isAdmin
    }, "mi_secreto_super_seguro",{
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 //1 dia
    });

    res.status(200).json({
      success: true,
      data: usuarioEncontrado
    });
  }catch(error){
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//verificar sesion
exports.verificarSesion = async (req,res) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      success: false
    });
  }

  try{
    const decoded = jwt.verify(
      token,
      "mi_secreto_super_seguro"
    );

    res.status(200).json({
      success: true,
      user: decoded
    });
  }catch(error){
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//actualizar usuarios
exports.updateUser = async (req, res) => {
  try{
    const {id} = req.params;

    const {nombre, usuario, fecha_nac, contrasena} = req.body;

    const usuarioActual = await usersModel.findById(id);

    if(!usuarioActual){
      borrarImagen(req.file);

      return res.status(400).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    if(usuario !== usuarioActual.usuario){
      const usuarioExiste = await usersModel.findOne({usuario});

      if(usuarioExiste){
        borrarImagen(req.file);

        return res.status(400).json({
          success: false,
          message: "El usuario ya existe"
        });
      }
    }

    const datosActualizados = {nombre, usuario, fecha_nac};

    if(contrasena && contrasena.trim() !== ""){
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

      if(!regexPassword.test(contrasena)){
        borrarImagen(req.file);

        return res.status(400).json({
          success: false,
          message: "La contraseña debe tener minimo 8 caracteres, una mayúscula, un número y un carácter especial"
        });
      }

      const salt = await bcrypt.genSalt(10);

      datosActualizados.contrasena = await bcrypt.hash(contrasena, salt);
    }

    if(req.file){
      if(usuarioActual.imagen){
        const rutaVieja = path.join(
          __dirname,
          "../uploads",
          usuarioActual.imagen
        );

        fs.unlink(rutaVieja, (err) => {
          if(err){
            console.log(err);
          }
        });
      }
      datosActualizados.imagen = req.file.filename;
    }

    const usuarioActualizado = await usersModel.findByIdAndUpdate(
      id,
      datosActualizados,
      {new: true}
    );

    //Actulizar las cookies
    const token = jwt.sign({
      id: usuarioActualizado._id,
      nombre: usuarioActualizado.nombre,
      usuario: usuarioActualizado.usuario,
      fecha_nac: usuarioActualizado.fecha_nac,
      imagen: usuarioActualizado.imagen,
      isAdmin: usuarioActualizado.isAdmin
    },
    "mi_secreto_super_seguro",
    {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    });

    res.status(200).json({
      success: true,
      data: usuarioActualizado
    });

  }catch(err){
    borrarImagen(req.file);
    console.error(err);

    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

//logout
exports.logoutUser = async (req,res) => {
  
  res.clearCookie("token");

  res.status(200).json({
    success: true
  });
};