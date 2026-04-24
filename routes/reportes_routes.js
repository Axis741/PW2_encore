const express = require('express');
const router = express.Router();

const {
  getVentasGeneral,
  getVentasPorArtista,
  getTotales
} = require('../controllers/reportes_controller');


// Middleware de log
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// REPORTE GENERAL DE VENTAS
// GET /api/v1/reportes/ventas-general
router.route('/reportes/ventas-general')
  .get(getVentasGeneral);


// REPORTE POR ARTISTA
// GET /api/v1/reportes/ventas-por-artista/:id
router.route('/reportes/ventas-por-artista/:id')
  .get(getVentasPorArtista);


// TOTALES GENERALES
// GET /api/v1/reportes/totales
router.route('/reportes/totales')
  .get(getTotales);


module.exports = router;