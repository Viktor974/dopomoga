import express from 'express';
import { Follow } from '../controllers/Follow.js';
import { UserInfo , ProfileInfo, allUsers, editUser } from '../controllers/User.js';
import Auth from '../middlewares/Auth.js';
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router();

router.get('/all' , Auth, allUsers);

router.put('/follow/:followId' , Auth , Follow);

router.get('/profile' , Auth , ProfileInfo);

router.get('/:userId'  , Auth, UserInfo);

router.put('/edit' , Auth, uploadOptions.single("avatar") , editUser);

export default router