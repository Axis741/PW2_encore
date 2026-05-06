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
        }

        cb(null, base + "_" + Date.now() + ext);
    }
});

const upload = multer({storage});

module.exports = upload;