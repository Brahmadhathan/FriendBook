import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{
    const {username, email, password}=req.body;
    const hashedpassword = bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashedpassword});
    try {
        await newUser.save();
    res.status(201).json('user created successfully');

    } catch (error) {
        next(error);
    }
    
};

export const signin = async(req,res,next) => {
    const {email,password}= req.body;
    try {
        const validuser= await User.findOne({email:email});
        if(!validuser)return next(errorHandler(404,'user not found'));
        const validpassword = bcryptjs.compareSync(password,validuser.password);
        if (!validpassword) return next(errorHandler(401,'wrong credential'));
        //token for user identification
        const token = jwt.sign({id:validuser._id} ,process.env.JWT_SECRET)
        const {password:pass,...rest}=validuser._doc;
        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest);

    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
     //   console.log( req.body);
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...userData}=user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(userData);

        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedpassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase()
                +Math.random().toString(36).slice(-4), 
                email:req.body.email,password:hashedpassword,avatar:req.body.photo});
                await newUser.save();
                const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
                const {password:pass,...rest}=newUser._doc;
                res
                .cookie('access_token',token,{httpOnly:true})
                .status(200)
                .json(rest)
                
                
        }
       // console.log('Request Body:', req.body);

    } catch (error) {
        console.log(error);
    }
}

export const signOut= async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');
    } catch (error) {
        next(error)
    }
}