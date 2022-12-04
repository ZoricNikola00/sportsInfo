import mongoose from "mongoose";
import PostInfo from "../models/postsModel.js";
import {Request,Response} from 'express'


export const getPosts=async(req:Request,res:Response)=>{
    const {page}=req.query

    try{
        const limitPage=6
        const startIndex=(Number(page)-1)*limitPage
        const totalPages=await PostInfo.countDocuments({})
        const posts=await PostInfo.find().sort({_id:-1}).limit(limitPage).skip(startIndex)
        res.status(200).json({data:posts,page:Number(page), numberOfPages:Math.ceil(totalPages/limitPage)})
    }catch(err){
        res.status(404).json(console.log(err))
    }
}

export const addPost=async(req:Request,res:Response)=>{
    const data=req.body
    const newData=new PostInfo({...data, creator:req.userId,createdAt:new Date().toISOString()})

    try{
        await newData.save()
        res.status(201).json(newData)
    }catch(err){res.status(409).json(err)}
}