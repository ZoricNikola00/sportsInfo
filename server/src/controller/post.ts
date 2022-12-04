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

export const searchPost=async(req:Request,res:Response)=>{
    const {searchQuery,tags}=req.query
    try{
        const title= new RegExp(searchQuery as string,'i');
        const posts= await PostInfo.find({$or:[{title}, {tags:{$in:(tags as string).split(' ')}}]})
        res.json(posts)
    }catch(err){res.status(404).json(err)}
    
}

export const searchCreator=async(req:Request,res:Response)=>{
    const {name}=req.query
    try{
        const posts=await PostInfo.find({name})
        res.json(posts)
    }catch(err){
        res.status(404).json(err)
    }
}