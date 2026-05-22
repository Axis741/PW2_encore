const express = require('express');
const router = express.Router();

const {
  getVentasGeneral,
  getVentasPorArtista,
  getTotalesTablas
} = require('../controllers/reportes_controller');


// Middleware de log
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// TOTALES GENERALES
// GET /api/v1/reportes/totales
router.route('/totalesTablas')
  .get(getTotalesTablas);

// REPORTE GENERAL DE VENTAS
// GET /api/v1/reportes/ventas-general
router.route('/ventasGeneral')
  .get(getVentasGeneral);


// REPORTE POR ARTISTA
// GET /api/v1/reportes/ventas-por-artista/:id
router.route('/ventasPorArtista')
  .get(getVentasPorArtista);

module.exports = router;