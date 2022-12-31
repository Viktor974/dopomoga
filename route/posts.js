import express from "express"
import Auth from '../middlewares/Auth.js'
import Like from '../controllers/Like.js'
import { addComment, deleteComment } from '../controllers/Comment.js';
import {createPost, allPosts, deletePost, editPost, followingPosts} from "../controllers/Post.js"
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router()

router.post('/create' , Auth , uploadOptions.array('images' ,10)  , createPost);

router.get('/all' , Auth, allPosts);

router.delete('/delete/:postid' , Auth , deletePost );

router.put('/edit/:postid' , Auth , editPost);

router.put('/like/:postId' , Auth , Like);

router.post('/comment/add' , Auth , addComment);

router.delete('/comment/delete/:commentId' , Auth , deleteComment);

router.get('/following' , Auth , followingPosts);

export default router