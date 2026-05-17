const eventoModel = require("../models/eventos_model");

exports.getEventos = async (req, res) => {
    try{
        const eventos = await eventoModel
            .find()
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
        onsole.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};