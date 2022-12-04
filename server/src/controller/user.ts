import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import usersModel from '../models/usersModel.js'
import {Request,Response} from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

export const signIn=async(req:Request,res:Response)=>{
    const {email,password}=req.body

    try{
        const existingUser=await usersModel.findOne({email});
        if(!existingUser) res.status(404).json({message:'User doesnt exist!'})

        const correctPassword=await bcrypt.compare(password,existingUser?.password || '')
        if(!correctPassword) res.status(400).json({message:'Wrong password!'})
        const token=jwt.sign({email:existingUser?.email, id:existingUser?._id}, process.env.SECRET_TOKEN || 'test', {expiresIn:'1h'})
        res.status(200).json({result:existingUser, token})
    }catch(err){res.status(500).json({message:'Something is wrong!'})}
}

export const signUp=async(req:Request,res:Response)=>{
    const {email,password,firstName,lastName,confirmPassword}=req.body
    try{
        const existingUser=await usersModel.findOne({email});
        if(existingUser) res.status(404).json({message:'User does exist!'})

        if(password!==confirmPassword) res.status(400).json({message:'Wrong password!'})

        const hashedPassword= await bcrypt.hash(password,12)

        const result= await usersModel.create({email,password:hashedPassword, name:`${firstName} ${lastName}`})

        const token=jwt.sign({email:result.email,id:result._id}, process.env.SECRET_TOKEN || 'test', {expiresIn:'1h'})
        
        res.status(200).json({result:result, token})
    }catch(err){res.status(500).json({message:'Something is wrong!'})}

}
