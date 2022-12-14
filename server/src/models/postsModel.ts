import mongoose from "mongoose";

const Schema= new mongoose.Schema({
    title:String,
    name:String,
    info:String,
    tags:[String],
    file:String,
    creator:String,
    likes:{
        type:[String],
        default:[]
    },
    comments:{type:[String],defualt:[]},
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const PostInfo=mongoose.model('PostContent', Schema)

export default PostInfo