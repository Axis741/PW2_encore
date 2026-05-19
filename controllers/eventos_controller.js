const eventoModel = require("../models/eventos_model");
const fs = require("fs");
const path = require("path");
const { error } = require('console');

const borrarImagen = (file) => {

  if(file){

    const rutaImagen = path.join(
      __dirname,
      "../uploads",
      file.filename
    );

    fs.unlink(rutaImagen, (err) => {
      if(err){
        console.error("Error al borrar imagen:", err);
      }
    });

  }

};

exports.getEventos = async (req, res) => {
    try{
        const eventos = await eventoModel
            .find({estado: { $ne: "eliminado"}})
            .populate("id_artista");

        res.status(200).json({
            success: true,
            count: eventos.length,
            data: eventos
        });
    }catch(error){
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};

exports.createEvento = async (req,res) => {
    try {
        const evento = await eventoModel.create({
            id_artista: req.body.id_artista,
            tour: req.body.tour,
            presentaciones: req.body.presentaciones,
            imagen: req.file ? req.file.filename : null
        });

        res.status(201).json({
            success: true,
            data: evento
        });
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateEvento = async (req,res) => {
    try {
        const {id} = req.params;

        const eventoActual = await eventoModel.findById(id);

        if(!eventoActual){
            borrarImagen(req.file);

            return res.status(400).json({
                success: false,
                message: "Evento no encontrado"
            });
        }

        const datosActualizados = {
            id_artista: req.body.id_artista,
            tour: req.body.tour,
            presentaciones: req.body.presentaciones
        };

        if(req.file){
            if(eventoActual.imagen){
                const rutaVieja = path.join(
                    __dirname,
                    "../uploads",
                    eventoActual.imagen
                );
        
                fs.unlink(rutaVieja, (err) => {
                    if(err){
                    console.log(err);
                    }
                });
            }
            datosActualizados.imagen = req.file.filename;
        }

        const eventoActualizado = await eventoModel.findByIdAndUpdate(
            id,
            datosActualizados,
            {new: true}
        );

        res.status(200).json({
            success: true,
            data: eventoActualizado
        });

    } catch (error) {
        borrarImagen(req.file);
        console.error(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteEvento = async (req,res) => {
    try {
        const {id} = req.params;

        const eventoEliminado = await eventoModel.findByIdAndUpdate(
            id,
            {
                estado: "eliminado"
            },
            {new: true}
        );

        if(!eventoEliminado){
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Evento eliminado"
        });
    } catch (error) {
        console.error(error);
    
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};