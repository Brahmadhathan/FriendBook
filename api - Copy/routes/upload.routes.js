// api/routes/upload.routes.js
import express from 'express';
import upload from '../utils/multer.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = express.Router();

// Route to upload image
router.post('/upload', upload.single('image'), uploadImage);

export default router;
