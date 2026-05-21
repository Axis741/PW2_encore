const express = require('express');
const router = express.Router();

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductosByArtista,
  getVariantesById
} = require('../controllers/productos_controller');

const upload = require("../middlewares/upload");
const multer = require("multer");


// Middleware de prueba
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


// GET ALL + CREATE
router.route('/')
  .get(getProductos)       // Obtener todos los productos
  //.post(createProducto);   // Crear producto
  .post((req,res)=>{
    upload.single("imagen")(req,res, function(err){
      if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
          return res.status(400).json({
            success: false,
            message: "La imagen es demasiado pesada. Máximo 1MB"
          });
        }
      }else if(err){
        return res.status(400).json[{
          success: false,
          message: err.message
        }];
      }

      createProducto(req, res);
    });
  });


// FILTRO POR ARTISTA
router.route('/productos/artista/:id')
  .get(getProductosByArtista);


// GET BY ID + UPDATE + DELETE
router.route('/:id')
  .get(getProductoById)    // Obtener un producto
  .put(updateProducto)     // Actualizar producto
  .delete(deleteProducto); // Eliminar producto

router.route('/variantes/:id')
  .get(getVariantesById);


module.exports = router;