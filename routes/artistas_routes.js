const express = require('express');
const router = express.Router();
const upload =  require("../middlewares/upload");

const {
  getArtistas,
  getArtistaById,
  getProductosByArtista,
  createArtista,
  updateArtista,
  deleteArtista
} = require('../controllers/artistas_controller');
const multer = require('multer');


// Middleware de prueba
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// GET ALL + CREATE
router.route('/')
  .get(getArtistas)       // Obtener todos los artistas
  // .post(upload.single("imagen"),createArtista);   // Crear artista
  .post((req, res) => {
    upload.single("imagen")(req, res, function(err){

      if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
          return res.status(400).json({
            success: false,
            message: "La imagen es demasiado pesada. Máximo 1MB"
          });
        }
      }else if(err){
        return res.status(400).json({
          success:  false,
          message: err.message
        });
      }

      createArtista(req, res);
    });
  });


// PRODUCTOS DE UN ARTISTA
router.route('/:id/productos')
  .get(getProductosByArtista);


// GET BY ID + UPDATE + DELETE
router.route('/:id')
  .put((req, res) => {

    upload.single("imagen")(req, res, function(err){

      if(err instanceof multer.MulterError){

        if(err.code === "LIMIT_FILE_SIZE"){

          return res.status(400).json({
            success: false,
            message: "La imagen es demasiado pesada. Máximo 1MB"
          });

        }

      }else if(err){

        return res.status(400).json({
          success: false,
          message: err.message
        });

      }

      updateArtista(req, res);

    });

  })
  .delete(deleteArtista);


module.exports = router;