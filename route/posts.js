import express from "express"
import Auth from '../middlewares/Auth.js'
import {CommentLike, PostLike} from '../controllers/Like.js'
import {addCommentPost, deleteComment, editCommentPost} from '../controllers/Comment.js';
import {createPost, allPosts, deletePost, editPost, myPosts} from "../controllers/Post.js"
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router()

router.post('/create', Auth, uploadOptions.array('images', 10), createPost);

router.get('/all', Auth, allPosts);

router.delete('/delete/:postid', Auth, deletePost);

router.put('/edit/:postid', Auth, uploadOptions.array('images', 10), editPost);

router.put('/like/:postId', Auth, PostLike);

router.post('/comment/add', Auth, addCommentPost);

router.put('/comment/like/:commentId', Auth, CommentLike);

router.put('/comment/edit/:commentId', Auth, editCommentPost);

router.delete('/comment/delete', Auth, deleteComment);

router.get('/myposts', Auth, myPosts);

export default router