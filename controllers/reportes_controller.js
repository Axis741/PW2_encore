const compraModel = require('../models/compras_model');
const artistaModel = require("../models/artista_model");
const productoModel = require("../models/productos_model");

// @desc    Reporte general de ventas
// @route   GET /api/v1/reportes/ventas-general
// @access  Admin

exports.getTotalesTablas = async (req, res) => {
  try {
    const totalArtistas = await artistaModel.countDocuments({
      estado: { $ne: "eliminado"}
    });

    const totalProductos = await productoModel.countDocuments();

    const totalVentas = await compraModel.countDocuments({
      estado: {$ne: "cancelado"}
    });

    const totalIngresos = await compraModel.aggregate([
      {
        $match: {
          estado: {$ne: "cancelado"}
        }
      },
      {
        $group: {
          _id: null,
          totalIngresos: {
            $sum: "$total"
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalArtistas,
        totalProductos,
        totalVentas,
        totalIngresos: totalIngresos[0]?.totalIngresos || 0
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getVentasGeneral = async (req, res) => {
  try {
    const stockPorTipo = await productoModel.aggregate([
      {
        $lookup: {
          from: "productovariantes",
          localField: "_id",
          foreignField: "id_producto",
          as: "variantes"
        }
      },
      {
        $unwind: "$variantes"
      },
      {
        $group: {
          _id: "$tipo",
          stockTotal: {
            $sum: "$variantes.stock"
          },
          valorTotalStock: {
            $sum: {
              $multiply: [
                "$precio",
                "$variantes.stock"
              ]
            }
          }
        }
      }
    ]);

    const vendidoPorTipo = await compraModel.aggregate([
      {
        $match: {
          estado: {$ne: "cancelado"}
        }
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "productos",
          localField: "items.id_producto",
          foreignField: "_id",
          as: "producto"
        }
      },
      {
        $unwind: "$producto"
      },{
        $group: {
          _id: "$producto.tipo",
          cantidadVendida: {
            $sum: "$items.cantidad"
          },
          valorVendido: {
            $sum: {
              $multiply: [
                "$items.cantidad",
                "$items.precioUnitario"
              ]
            }
          }
        }
      }
    ]);

    const reporteFinal = stockPorTipo.map((stockItem) => {

      const vendido = vendidoPorTipo.find(
        (v) => v._id === stockItem._id
      );

      const valorVendido = vendido?.valorVendido || 0;

      const porcentaje =
        stockItem.valorTotalStock > 0
          ? (valorVendido * 100) / stockItem.valorTotalStock
          : valorVendido > 0
            ? 100
            : 0;

      return {
        tipo: stockItem._id,
        stockTotal: stockItem.stockTotal,
        valorTotalStock: stockItem.valorTotalStock,
        valorVendido,
        porcentaje
      };
    });

    res.status(200).json({
      success: true,
      data: reporteFinal
    });
  } catch (error) {
    console.log(error);
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
    const reportePorArtista = await compraModel.aggregate([
      {
        $match: {
          estado: {$ne: "cancelado"}
        }
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "artistas",
          localField: "items.id_artista",
          foreignField: "_id",
          as: "artista"
        }
      },
      {
        $unwind: "$artista"
      },
      {
        $group: {
          _id: "$items.id_artista",
          nombreArtista: {
            $first: "$artista.nombre"
          },
          imagenArtista: {
            $first: "$artista.foto"
          },
          totalVentas: {
            $sum: {
              $multiply: [
                "$items.cantidad",
                "$items.precioUnitario"
              ]
            }
          }
        }
      },
      {
        $sort: {
          totalVentas: -1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: reportePorArtista
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};