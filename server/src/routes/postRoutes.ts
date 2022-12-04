import express from 'express'
import {addPost, commentPost, deletePost, editPost, getPost, getPosts, likePost, searchCreator, searchPost} from '../controller/post.js'
import auth from '../middleware/auth.js'
const router=express.Router()

router.get('/',getPosts);
router.post('/',auth, addPost)
router.get('/search', searchPost)
router.get('/creator', searchCreator)
router.get('/:id', getPost)
router.patch('/:id/like',auth,likePost)
router.delete('/:id', auth,deletePost )
router.patch('/:id',auth,editPost)
router.post('/:id/commentPost',auth,commentPost)
export default router