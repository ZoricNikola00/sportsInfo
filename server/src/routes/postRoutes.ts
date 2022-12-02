import express from 'express'
import {addPost, getPosts} from '../controller/post.js'

const router=express.Router()

router.get('/',getPosts);
router.post('/', addPost)

export default router