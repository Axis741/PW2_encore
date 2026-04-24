const express = require('express');
const router = express.Router();

const {
  getArtistas,
  getArtistaById,
  getProductosByArtista,
  createArtista,
  updateArtista,
  deleteArtista
} = require('../controllers/artistas_controller');


// Middleware de prueba
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// GET ALL + CREATE
router.route('/')
  .get(getArtistas)       // Obtener todos los artistas
  .post(createArtista);   // Crear artista


// PRODUCTOS DE UN ARTISTA
router.route('/:id/productos')
  .get(getProductosByArtista);


// GET BY ID + UPDATE + DELETE
router.route('/:id')
  .get(getArtistaById)    // Obtener artista por ID
  .put(updateArtista)     // Actualizar artista
  .delete(deleteArtista); // Eliminar artista


module.exports = router;