import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary (add your credentials here)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  });


// api/controllers/upload.controller.js
export const uploadImage = (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
       // Upload image to Cloudinary
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      
      res.status(201).json({
        success: true,
        message: 'Image uploaded successfully!',
        data: {
          url: path,
          filename: originalname,
          type: mimetype,
        },
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  