const usersModel = require('../models/users_model');
const bcrypt = require("bcrypt");
//const users = [ { id: 1, name: 'Hadi Soufan' }, { id: 2, name: 'Melia Malik' }, { id: 3, name: 'Zayn Cerny' }];
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res) => {
  const users = await usersModel.find();
  res.status(200).json({ success: true, count: users.length, data: users});
};

//-------------CREATE--------------
exports.createUser = async (req, res) => {
  try{
    const cycles = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.contrasena, cycles);

    const usuario = await usersModel.create({
      nombre: req.body.nombre,
      fecha_nac: req.body.fecha_nac,
      usuario: req.body.usuario,
      contrasena: hashedPassword,
      imagen: req.file ? req.file.filename : null
    });

    res.status(201).json({
      success: true,
      data: usuario
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
      return res.status(400).json({success: false, message: "El usuario no existe"});
    }

    const isValid = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if(!isValid){
      return res.status(400).json({ success: false, message: "La contraseña es incorrecta"});
    }

    res.status(200).json({
      success: true,
      data: usuarioEncontrado
    });
  }catch(error){
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};