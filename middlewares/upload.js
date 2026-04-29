const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nombre = req.body.nombre
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

        cb(null, nombre + "_" + Date.now() + ext);
    }
});

const upload = multer({storage});

module.exports = upload;