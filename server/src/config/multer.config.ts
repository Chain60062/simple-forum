import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/uploads')) {
      fs.mkdir('public/uploads', (err)=>{
        return err?.message;
      });
    }
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
export default upload;

