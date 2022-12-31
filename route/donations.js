import express from "express"
import Auth from '../middlewares/Auth.js'
import Like from '../controllers/Like.js'
import { addComment, deleteComment } from '../controllers/Comment.js';
import {createDonation, allDonations, DeleteDonation, editDonation} from "../controllers/Donation.js"
const uploadOptions = require('../middlewares/Uploads.js');

const router = express.Router()


router.post('/create' , Auth , uploadOptions.array('images' ,10)  , createDonation);

router.get('/all' , Auth, allDonations);

router.delete('/delete/:postid' , Auth , DeleteDonation );

router.put('/edit/:postid' , Auth , editDonation);

router.put('/like/:postId' , Auth , Like);

router.post('/comment/add' , Auth , addComment);

router.delete('/comment/delete/:commentId' , Auth , deleteComment)

export default router