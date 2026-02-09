import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

export const upload = multer({ storage });
