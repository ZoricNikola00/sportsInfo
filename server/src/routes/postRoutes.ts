import express from 'express'
import {addPost, getPosts} from '../controller/post.js'
import auth from '../middleware/auth.js'
const router=express.Router()

router.get('/',getPosts);
router.post('/',auth, addPost)

export default router