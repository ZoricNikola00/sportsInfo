import axios from "axios";
import { postDataType, SearchData, userData } from "../context";

const API=axios.create({baseURL:'http://localhost:5000/'})

API.interceptors.request.use((req:any)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`
    }
    return req
})

export const getPosts=(currentPage:number|string)=>API.get(`/posts?page=${currentPage}`)
export const addPost=(data:postDataType)=>API.post('/posts',data)
export const searchPosts=(searchData:SearchData)=>API.get(`/posts/search?searchQuery=${searchData.term || 'none'}&tags=${searchData.tags}`)
export const searchCreator=(creator:string|undefined)=>API.get(`/posts/creator?name=${creator}`)
export const getPost=(id:string|undefined)=>API.get(`/posts/${id}`)
export const deletePost=(id:string|undefined)=>API.delete(`/posts/${id}`)
export const likePost=(id:string|undefined)=>API.patch(`/posts/${id}/like`)
export const editPost=(id:string|undefined, data:postDataType)=>API.patch(`/posts/${id}`, data)
export const commentPost=(id:string|undefined,comment:string)=>API.post(`/posts/${id}/commentPost`, {comment})

export const signIn=(data:userData)=>API.post('/user/signin', data)
export const signUp=(data:userData)=>API.post('/user/signup', data)