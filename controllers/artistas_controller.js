const artistaModel = require('../models/artista_model');
const productosModel = require('../models/productos_model');

exports.getArtistas = async (req, res) => {
  try {
    const artistas = await artistaModel.find();

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
    const artista = await artistaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

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
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteArtista = async (req, res) => {
  try {
    const artista = await artistaModel.findByIdAndDelete(req.params.id);

    if (!artista) {
      return res.status(404).json({
        success: false,
        message: 'Artista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Artista eliminado correctamente'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};