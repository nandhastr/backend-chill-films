import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, "../../assets/upload/");
        fs.mkdirSync(filePath, {recursive: true})
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const date = new Date().toJSON().slice(0, 10).replace(/-/g,"");
        cb(null, `${date}-${file.originalname}`);
    },
});

export default storage;
