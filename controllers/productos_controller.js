const productosModel = require('../models/productos_model');


// @desc    Get all products
// @route   GET /api/v1/productos
// @access  Public
exports.getProductos = async (req, res) => {
  try {
    const productos = await productosModel
      .find()
      .populate('id_tipo')
      .populate('id_artista');

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get single product
// @route   GET /api/v1/productos/:id
// @access  Public
exports.getProductoById = async (req, res) => {
  try {
    const producto = await productosModel
      .findById(req.params.id)
      .populate('id_tipo')
      .populate('id_artista');

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: producto
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Create new product
// @route   POST /api/v1/productos
// @access  Public (luego puedes protegerlo con auth)
exports.createProducto = async (req, res) => {
  try {
    const producto = await productosModel.create(req.body);

    res.status(201).json({
      success: true,
      data: producto
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// @desc    Update product
// @route   PUT /api/v1/productos/:id
// @access  Public
exports.updateProducto = async (req, res) => {
  try {
    const producto = await productosModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: producto
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// @desc    Delete product
// @route   DELETE /api/v1/productos/:id
// @access  Public
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await productosModel.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get products by artist
// @route   GET /api/v1/productos/artista/:id
exports.getProductosByArtista = async (req, res) => {
  try {
    const productos = await productosModel.find({
      id_artista: req.params.id
    });

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};