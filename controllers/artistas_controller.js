const artistaModel = require('../models/artista_model');
const productosModel = require('../models/productos_model');
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

exports.getArtistas = async (req, res) => {
  try {
    const artistas = await artistaModel.find({estado: {$ne: "eliminado"}});

    res.status(200).json({
      success: true,
      count: artistas.length,
      data: artistas
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getArtistaById = async (req, res) => {
  try {
    const artista = await artistaModel.findById(req.params.id);

    if (!artista) {
      return res.status(404).json({
        success: false,
        message: 'Artista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: artista
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductosByArtista = async (req, res) => {
  try {
    const artista = await artistaModel.findById(req.params.id);

    if (!artista) {
      return res.status(404).json({
        success: false,
        message: 'Artista no encontrado'
      });
    }

    const productos = await productosModel
      .find({ id_artista: req.params.id })
      .populate('id_tipo');

    res.status(200).json({
      success: true,
      artista: artista.nombre,
      count: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createArtista = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const artista = await artistaModel.create({
      nombre: req.body.nombre,
      foto: req.file ? req.file.filename : null
    });

    res.status(201).json({
      success: true,
      data: artista
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateArtista = async (req, res) => {
  try {
    const {id} = req.params;

    const artistaActual = await artistaModel.findById(id);

    if(!artistaActual){
      borrarImagen(req.file);

      return res.status(400).json({
        success: false,
        message: "Artista no encontrado"
      });
    }

    const datosArtistaActualizados = {
      nombre: req.body.nombre
    };

    if(req.file){
      if(artistaActual.foto){
        const rutaVieja = path.join(
          __dirname,
          "../uploads",
          artistaActual.foto
        );

        fs.unlink(rutaVieja, (err) => {
          if(err){
            console.log(err);
          }
        });
      }
      datosArtistaActualizados.foto = req.file.filename;
    }

    const artistaActualizado = await artistaModel.findByIdAndUpdate(
      id,
      datosArtistaActualizados,
      {new: true}
    );

    res.status(200).json({
      success: true,
      data: artistaActualizado
    });

  } catch (error) {
    borrarImagen(req.file);
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteArtista = async (req, res) => {
  try {
    const {id} = req.params;

    const artistaEliminado = await artistaModel.findByIdAndUpdate(
      id,
      {
        estado: "eliminado"
      },
      {new: true}
    );

    if(!artistaEliminado){
      return res.status(400).json({
        success: false,
        message: "Artista no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Artista eliminado"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};