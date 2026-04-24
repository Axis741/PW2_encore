const express = require('express');
const router = express.Router();

const {
  confirmarOrden,
  getOrdenesByUsuario
} = require('../controllers/ordenes_controller');


// Middleware de log
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// CONFIRMAR ORDEN (checkout)
// POST /api/v1/ordenes/confirmar
router.route('/ordenes/confirmar')
  .post(confirmarOrden);


// OBTENER ÓRDENES POR USUARIO
// GET /api/v1/ordenes/usuario/:id
router.route('/ordenes/usuario/:id')
  .get(getOrdenesByUsuario);


module.exports = router;