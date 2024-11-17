import express from 'express';
import userRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import listingRoute from './routes/listing.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import imageRoutes from './routes/image.routes.js'
import path from 'path';
import { error } from 'console';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err.message);
})

const __dirname = path.resolve();

const app = express();
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,POST,PUT, DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }));

  // Add COOP and COEP headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
  
app.use(express.json());

app.use(cookieParser());

app.listen(3000,()=>{
    console.log("the server is running in port 3000" )
});

app.get('/test',(req,res)=>{
    res.json({
        message:"hello first api"
    });
});

app.use("/api/user",userRouter);
app.use("/api/auth",AuthRouter);
app.use("/api/listing",listingRoute);
app.use("/api",uploadRoutes);
app.use('/api', imageRoutes);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

//middle ware for the error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||'internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});