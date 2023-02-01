import multer from 'multer';
import path from 'node:path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
export default upload;
