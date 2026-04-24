const express = require('express');
const router = express.Router();

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductosByArtista
} = require('../controllers/productos_controller');


// Middleware de prueba
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// GET ALL + CREATE
router.route('/productos')
  .get(getProductos)       // Obtener todos los productos
  .post(createProducto);   // Crear producto


// FILTRO POR ARTISTA
router.route('/productos/artista/:id')
  .get(getProductosByArtista);


// GET BY ID + UPDATE + DELETE
router.route('/productos/:id')
  .get(getProductoById)    // Obtener un producto
  .put(updateProducto)     // Actualizar producto
  .delete(deleteProducto); // Eliminar producto


module.exports = router;