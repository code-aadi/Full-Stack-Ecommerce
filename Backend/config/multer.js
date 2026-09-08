import multer from "multer";
import path from "path";
const storage = multer.memoryStorage()
const imageFilter = function (req, file, cb) {
  
  const filetypes = /jpeg|jpg|png|gif|webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const allowedMimes = /image\/jpeg|image\/jpg|image\/png|image\/gif|image\/webp/;
  const mimetype = allowedMimes.test(file.mimetype);  
  if (mimetype && extname) {
    return cb(null, true); 
  } else {
    cb(new Error('Only images are allowed! (jpeg, jpg, png, gif, webp)'), false);
  }
};

const upload = multer({
    storage : storage,
    fileFilter : imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 

})
export default upload