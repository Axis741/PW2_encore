const compraModel = require('../models/compras_model');
const artistaModel = require("../models/artista_model");
const productoModel = require("../models/productos_model");

// @desc    Reporte general de ventas
// @route   GET /api/v1/reportes/ventas-general
// @access  Admin
exports.getVentasGeneral = async (req, res) => {
  try {
    const reporte = await compraModel.aggregate([
      {
        $group: {
          _id: null,
          totalVentas: { $sum: "$total" },
          totalOrdenes: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: reporte[0] || { totalVentas: 0, totalOrdenes: 0 }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// @desc    Reporte de ventas por artista
// @route   GET /api/v1/reportes/ventas-por-artista/:id
// @access  Admin
exports.getVentasPorArtista = async (req, res) => {
  try {
    const artistaId = req.params.id;

    const reporte = await compraModel.aggregate([
      // Descomponer items
      { $unwind: "$items" },

      // Traer info de variante
      {
        $lookup: {
          from: "productovariantes",
          localField: "items.id_variante",
          foreignField: "_id",
          as: "variante"
        }
      },
      { $unwind: "$variante" },

      // Traer producto
      {
        $lookup: {
          from: "productos",
          localField: "variante.id_producto",
          foreignField: "_id",
          as: "producto"
        }
      },
      { $unwind: "$producto" },

      // Filtrar por artista
      {
        $match: {
          "producto.id_artista": require("mongoose").Types.ObjectId(artistaId)
        }
      },

      // Agrupar resultados
      {
        $group: {
          _id: "$producto.id_artista",
          totalVentas: {
            $sum: {
              $multiply: ["$items.cantidad", "$items.precioUnitario"]
            }
          },
          totalProductosVendidos: { $sum: "$items.cantidad" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: reporte[0] || {
        totalVentas: 0,
        totalProductosVendidos: 0
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// @desc    Totales vendidos
// @route   GET /api/v1/reportes/totales
// @access  Admin
exports.getTotales = async (req, res) => {
  try {
    const reporte = await compraModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          totalIngresos: {
            $sum: {
              $multiply: ["$items.cantidad", "$items.precioUnitario"]
            }
          },
          totalProductosVendidos: { $sum: "$items.cantidad" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: reporte[0] || {
        totalIngresos: 0,
        totalProductosVendidos: 0
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTotalesTablas = async (req, res) => {
  try {
    const totalArtistas = await artistaModel.countDocuments({
      estado: { $ne: "eliminado"}
    });

    const totalProductos = await productoModel.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        totalArtistas,
        totalProductos
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};