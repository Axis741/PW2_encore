const express = require('express');
const router = express.Router();

const {
  getCarritos,
  getCarritoByUsuario,
  createCarrito,
  addItemToCarrito,
  updateCantidadItem,
  removeItemFromCarrito,
  clearCarrito
} = require('../controllers/carrito_controller');


// Middleware de prueba
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// GET ALL + CREATE
router.route('/')
  .get(getCarritos)     // Obtener todos los carritos
  .post(createCarrito); // Crear carrito


// GET CART BY USER
router.route('/:id_usuario')
  .get(getCarritoByUsuario) // Obtener carrito por usuario
  .delete(clearCarrito);    // Vaciar carrito


// ADD ITEM TO CART
router.route('/:id_usuario/items')
  .post(addItemToCarrito);


// UPDATE ITEM QUANTITY
router.route('/:id_usuario/items/:id_variante')
  .put(updateCantidadItem)
  .delete(removeItemFromCarrito);


module.exports = router;