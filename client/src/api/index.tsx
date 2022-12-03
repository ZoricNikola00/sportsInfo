import axios from "axios";
import { postDataType, userData } from "../context";

const API=axios.create({baseURL:'http://localhost:5000/'})


export const getPosts=(currentPage:number|string)=>API.get(`/posts?page=${currentPage}`)
export const addPost=(data:postDataType)=>API.post('/posts',data)

export const signIn=(data:userData)=>API.post('/user/signin', data)
export const signUp=(data:userData)=>API.post('/user/signup', data)