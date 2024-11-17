import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({
        message:"api is working",
    });
};

export const updateUser=async (req,res,next) =>{
    // Ensure req.user is populated; otherwise, throw an error
    if (!req.user) return next(errorHandler(401, 'User not authenticated'));

    if(req.user.id!== req.params.id)return next(errorHandler(401,'you can only update your own account!'))
        try {
            if (req.body.password){
                req.body.password=bcryptjs.hashSync(req.body.password,10)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:req.body.avatar,
                }

            },{new:true})

            const {password,...rest}=updatedUser._doc
            res.status(200).json(rest);
        } catch (error) {
            console.error("Error updating user:", error.message);
            next(errorHandler(500, 'Internal server error'));
        }
};

export const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only delete your account'));
    try {
        await User.findById(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('user have been deleted');
    } catch (error) {
        next(error)
    }
}