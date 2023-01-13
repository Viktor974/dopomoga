import express from "express"
import Auth from '../middlewares/Auth.js'
import {DonationLike} from '../controllers/Like.js'
import { addCommentDonation, deleteComment } from '../controllers/Comment.js';
import {createDonation, allDonations, DeleteDonation, editDonation} from "../controllers/Donation.js"
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router()


router.post('/create' , Auth , uploadOptions.array('images' ,10)  , createDonation);

router.get('/all' , Auth, allDonations);

router.delete('/delete/:donationId' , Auth , DeleteDonation );

router.put('/edit/:donationId' , Auth , editDonation);

router.put('/like/:donationId' , Auth , DonationLike);

router.post('/comment/add' , Auth , addCommentDonation);

router.delete('/comment/delete/:commentId' , Auth , deleteComment)

export default router