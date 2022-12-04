import mongoose, { mongo } from "mongoose";
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

export const getPost=async(req:Request,res:Response)=>{
    const {id}=req.params
    try{
        const singlePost=await PostInfo.findById(id)
        res.status(200).json(singlePost)
    }catch(err){console.log(res.status(404).json({message:err}));
    }
}

export const likePost=async(req:Request,res:Response)=>{
    const {id}=req.params
    if(!req.userId)res.json({message:'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that ID')

    const post = await PostInfo.findById(id)
    let newLikes=post?.likes
    
    const index=newLikes?.findIndex((id)=>id===String(req.userId))
    
    index===-1 ? newLikes?.push(String(req.userId)):newLikes=newLikes?.filter(id=>id!==String(req.userId))
    
    const updatedPost=await PostInfo.findByIdAndUpdate(id,{likes:newLikes},{new:true})
    res.json(updatedPost)
}

export const deletePost=async(req:Request,res:Response)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that ID')
    await PostInfo.findByIdAndDelete(id)
    res.json({message:'Successful delete!'})
}

export const editPost=async(req:Request,res:Response)=>{
    const data=req.body
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that ID')
    const updatedPost=await PostInfo.findByIdAndUpdate(id,data,{new:true})
    res.json(updatedPost)
}

export const commentPost=async(req:Request,res:Response)=>{
    const {id}=req.params
    const {comment}=req.body
    const post=await PostInfo.findById(id)
    post?.comments.push(comment)
    const updatedPost=await PostInfo.findByIdAndUpdate(id,{...post},{new:true})
    console.log(updatedPost);
    res.json(updatedPost)
}