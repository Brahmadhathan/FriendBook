// api/utils/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// Setup storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  // Cloudinary instance (make sure you have cloudinaryConfig.js correctly set up)
  params: {
    folder: 'uploads',  // You can specify a folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],  // Allowed file formats
  },
});

const upload = multer({ storage :storage});

export default upload;
