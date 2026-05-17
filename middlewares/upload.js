const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        
        let base = "archivo";

        if(req.body.usuario){
            base = req.body.usuario
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^a-z0-9_]/g, "");
        }else if(req.body.nombre){
            base = req.body.nombre
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^a-z0-9_]/g, "");
        }else if(req.body.tour){
            base = req.body.tour
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^a-z0-9_]/g, "");
        }

        cb(null, base + "_" + Date.now() + ext);
    }
});

//VALIDAR TIPO DE ARCHIVO
const fileFilter = (req, file, cb) => {

    const tiposPermitidos = /jpeg|jpg|png|webp/;

    const extname = tiposPermitidos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = tiposPermitidos.test(file.mimetype);

    if(extname && mimetype){

        return cb(null, true);

    }else{

        cb(new Error("Solo se permiten imágenes JPG, PNG o WEBP"));

    }

};

const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;