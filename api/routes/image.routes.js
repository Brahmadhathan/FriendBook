// routes/image.routes.js
import express from 'express';
import {v2 as cloudinary} from 'cloudinary';

const router = express.Router();

router.get('/images', async (req, res) => {
  try {
    // Fetch images from Cloudinary (adjust based on how you store/retrieve images)
    const { resources } = await cloudinary.search
      .expression('folder:uploads')
      .sort_by('created_at', 'desc')
      .max_results(10)
      .execute();

    const images = resources.map((file) => ({
      url: file.secure_url,
      filename: file.public_id,
    }));

    res.json({ images });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

export default router;
