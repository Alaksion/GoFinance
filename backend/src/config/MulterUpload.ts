import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');
      const filename = `${file.originalname}-${hash}`;
      return callback(null, filename);
    },
  }),
};
