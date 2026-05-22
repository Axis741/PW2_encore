const carritoModel = require('../models/carrito_model');
const productoVariantesModel = require('../models/producto_variantes_model');


// @desc    Get all carts
// @route   GET /api/v1/carrito
// @access  Public
exports.getCarritos = async (req, res) => {
  try {
    const carritos = await carritoModel
      .find()
      .populate('id_usuario')
      .populate({
        path: 'items.id_variante',
        populate: {
            path: 'id_producto',
            populate: {
                path: 'id_artista'
            }
        }
      });

    res.status(200).json({
      success: true,
      count: carritos.length,
      data: carritos
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Get cart by user
// @route   GET /api/v1/carrito/:id_usuario
// @access  Public
exports.getCarritoByUsuario = async (req, res) => {
  try {
    const carrito = await carritoModel
      .findOne({ id_usuario: req.params.id_usuario })
      .populate('id_usuario')
      .populate({
        path: 'items.id_variante',
        populate: {
            path: 'id_producto',
            populate: {
                path: 'id_artista'
            }
        }
      });

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: carrito
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Create cart
// @route   POST /api/v1/carrito
// @access  Public
exports.createCarrito = async (req, res) => {
  try {

    const carritoExistente = await carritoModel.findOne({
      id_usuario: req.body.id_usuario
    });

    if (carritoExistente) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya tiene un carrito'
      });
    }

    const carrito = await carritoModel.create({
      id_usuario: req.body.id_usuario,
      items: req.body.items || []
    });

    res.status(201).json({
      success: true,
      data: carrito
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Add item to cart
// @route   POST /api/v1/carrito/:id_usuario/items
// @access  Public
exports.addItemToCarrito = async (req, res) => {
  try {

    const { id_variante, cantidad } = req.body;

    const variante = await productoVariantesModel.findById(id_variante);

    if (!variante) {
      return res.status(404).json({
        success: false,
        message: 'Variante no encontrada'
      });
    }

    if(cantidad > variante.stock){
        return res.status(400).json({
            success: false,
            message: "Stock insuficiente"
        });
    }

    let carrito = await carritoModel.findOne({
      id_usuario: req.params.id_usuario
    });

    // Si no existe carrito, crearlo
    if (!carrito) {
      carrito = await carritoModel.create({
        id_usuario: req.params.id_usuario,
        items: []
      });
    }

    // Revisar si el item ya existe
    const itemIndex = carrito.items.findIndex(
      item =>
        item.id_variante._id.toString() ===
        id_variante
    );

    if (itemIndex > -1) {

      carrito.items[itemIndex].cantidad += Number(cantidad);

    } else {

      carrito.items.push({
        id_variante,
        cantidad
      });

    }

    carrito.fecha_mod = Date.now();

    await carrito.save();

    const carritoActualizado = await carritoModel
        .findOne({
            id_usuario: req.params.id_usuario
        })
        .populate('id_usuario')
        .populate({
            path: 'items.id_variante',
            populate: {
                path: 'id_producto',
                populate: {
                    path: 'id_artista'
                }
            }
        });

    res.status(200).json({
        success: true,
        data: carritoActualizado
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Update item quantity
// @route   PUT /api/v1/carrito/:id_usuario/items/:id_variante
// @access  Public
exports.updateCantidadItem = async (req, res) => {
  try {

    const carrito = await carritoModel.findOne({
      id_usuario: req.params.id_usuario
    });

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado'
      });
    }

    const item = carrito.items.find(
      item =>
        item.id_variante._id.toString() ===
        req.params.id_variante
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado en el carrito'
      });
    }

    item.cantidad = req.body.cantidad;
    carrito.fecha_mod = Date.now();

    await carrito.save();

    const carritoActualizado = await carritoModel
        .findOne({
            id_usuario: req.params.id_usuario
        })
        .populate('id_usuario')
        .populate({
            path: 'items.id_variante',
            populate: {
                path: 'id_producto',
                populate: {
                    path: 'id_artista'
                }
            }
        });

    res.status(200).json({
        success: true,
        data: carritoActualizado
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Remove item from cart
// @route   DELETE /api/v1/carrito/:id_usuario/items/:id_variante
// @access  Public
exports.removeItemFromCarrito = async (req, res) => {
  try {

    const carrito = await carritoModel.findOne({
      id_usuario: req.params.id_usuario
    });

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado'
      });
    }

    carrito.items = carrito.items.filter(
      item =>
        item.id_variante._id.toString() !==
        req.params.id_variante
    );

    carrito.fecha_mod = Date.now();

    await carrito.save();

    const carritoActualizado = await carritoModel
        .findOne({
            id_usuario: req.params.id_usuario
        })
        .populate('id_usuario')
        .populate({
            path: 'items.id_variante',
            populate: {
                path: 'id_producto',
                populate: {
                    path: 'id_artista'
                }
            }
        });

    res.status(200).json({
        success: true,
        data: carritoActualizado
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// @desc    Clear cart
// @route   DELETE /api/v1/carrito/:id_usuario
// @access  Public
exports.clearCarrito = async (req, res) => {
  try {

    const carrito = await carritoModel.findOne({
      id_usuario: req.params.id_usuario
    });

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado'
      });
    }

    carrito.items = [];
    carrito.fecha_mod = Date.now();

    await carrito.save();

    res.status(200).json({
      success: true,
      message: 'Carrito vaciado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};