import multer from "multer";
import storage from "../services/storageConfig/storageConfig.js";
import path from "path";

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("myFile");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        req.fileValidationError = "Error: Images only! (jpeg, jpg, png, gif)";
        cb("Error: Images only! (jpeg, jpg, png, gif)");
    }
}

export default upload;
