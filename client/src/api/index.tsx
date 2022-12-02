import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5000/'})


export const getPosts=(currentPage:number|string)=>API.get(`/posts?page=${currentPage}`)