import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {User} from "../models/user.model.js";

dotenv.config();

const signToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1d'})
}
export const signUp = async (req,res ) =>{
    const {name,email,password,profilePic} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:'Please provide all fields'
        })
    }
    if (password.length< 6){
        return res.status(400).json({
            success:false,
            message:'Password must be at least 6 characters'
        })
    }

    const session = await mongoose.startSession()

    session.startTransaction();

    try{
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(409).json({message: 'User already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword,
            profilePic
        }],{session})


        const token = signToken(newUser[0]._id)
        res.cookie('jwt', token,{
            maxAge: 24*60*60*1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        await session.commitTransaction();
        await session.endSession();
        res.status(201).json({
            success:true,
            token,
            user:newUser[0]
        })
    }catch(err){
        await session.abortTransaction();
        await session.endSession();
        console.log("Error in signUpRoute: ",err)
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

export const signIn = async (req,res) =>{
    const {email, password} =req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please provide all fields'
            })
        }
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            return res.status(401).json({message: 'User does not exist'})
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordMatch){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = signToken(existingUser._id)
        res.cookie('jwt', token,{
            maxAge: 24*60*60*1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        res.status(200).json({
            success:true,
            token,
            user:existingUser
        })
    }catch(err){
        console.log("Error in signUpRoute: ",err)
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }

}
export const signOut = async (req,res ) =>{
    res.clearCookie('jwt');
    res.status(200).json({
        success:true,
        message:'Successfully logged out'
    })
}

export const currentUser = async(req, res ) =>{
    res.status(200).json({ success: true, user: req.user });
}