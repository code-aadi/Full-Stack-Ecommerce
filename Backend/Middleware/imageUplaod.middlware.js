import multer from "multer"
import upload from "../config/multer.js";
const imageUploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'Image size 2MB se kam honi chahiye.' });
      }
      return res.status(400).json({ success: false, message: err.message });
    } 
    
    else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    next();
  });
};

export default imageUploadMiddleware