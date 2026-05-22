const compraModel = require('../models/compras_model');
const carritoModel = require('../models/carrito_model');
const productoVarianteModel = require('../models/producto_variantes_model');


// @desc    Confirmar compra (crear orden)
// @route   POST /api/v1/ordenes/confirmar
// @access  Public
exports.confirmarOrden = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    // 1. Obtener carrito del usuario
    const carrito = await carritoModel.findOne({ id_usuario });

    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carrito está vacío'
      });
    }

    let total = 0;
    const itemsCompra = [];

    // 2. Procesar cada item del carrito
    for (const item of carrito.items) {
      const variante = await productoVarianteModel
      .findById(item.id_variante)
      .populate({
          path: 'id_producto',
          populate: {
              path: 'id_artista'
          }
      });

      if (!variante) {
        return res.status(404).json({
          success: false,
          message: 'Variante no encontrada'
        });
      }

      // Validar stock
      if (variante.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para ${variante.id_producto.nombre_producto}`
        });
      }

      // Restar stock
      variante.stock -= item.cantidad;
      await variante.save();

      // Calcular subtotal
      const precio = variante.id_producto.precio;
      total += precio * item.cantidad;

      itemsCompra.push({
          id_variante: variante._id,

          id_producto: variante.id_producto._id,

          id_artista:
              variante.id_producto.id_artista._id,

          nombre_producto:
              variante.id_producto.nombre_producto,

          nombre_artista:
              variante.id_producto.id_artista.nombre,

          talla: variante.talla,

          cantidad: item.cantidad,

          precioUnitario: precio
      });
    }

    // 3. Crear orden (compra)
    const nuevaCompra = await compraModel.create({
      id_usuario,
      items: itemsCompra,
      total,
      estado: "pagado" // simulado
    });

    // 4. Vaciar carrito
    carrito.items = [];
    await carrito.save();

    res.status(201).json({
      success: true,
      message: 'Orden generada correctamente',
      data: nuevaCompra
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// @desc    Obtener órdenes por usuario
// @route   GET /api/v1/ordenes/usuario/:id
// @access  Public
exports.getOrdenesByUsuario = async (req, res) => {
  try {
    const ordenes = await compraModel
      .find({ id_usuario: req.params.id })
      .populate({
        path: "items.id_variante",
        populate: {
          path: "id_producto"
        }
      });

    res.status(200).json({
      success: true,
      count: ordenes.length,
      data: ordenes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};