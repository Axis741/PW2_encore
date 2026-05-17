const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const multer = require('multer');

const { getEventos, createEvento, updateEvento, deleteEvento} = require("../controllers/eventos_controller");

router.route('/')
    .get(getEventos)
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
                    success: false,
                    message: err.message
                });

            }

            createEvento(req, res);

        });

    });

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

      updateEvento(req, res);

    });

  })
  .delete(deleteEvento);

module.exports = router;