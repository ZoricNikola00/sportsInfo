import express from 'express'
import {addPost, getPost, getPosts, searchCreator, searchPost} from '../controller/post.js'
import auth from '../middleware/auth.js'
const router=express.Router()

router.get('/',getPosts);
router.post('/',auth, addPost)
router.get('/search', searchPost)
router.get('/creator', searchCreator)
router.get('/:id', getPost)
export default router