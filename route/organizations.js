import express from "express"
import Auth from '../middlewares/Auth.js'
import {
    info,
    createOrganization,
    allPosts,
    editOrganization,
    deleteOrganization,
    myPosts,
    allOrganizations
} from "../controllers/Organization.js"
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router()

router.post('/create', Auth, uploadOptions.array('images', 10), createOrganization);

router.get('/all', Auth, allPosts);
router.get('/allOrg', Auth, allOrganizations);
router.get('/edit', Auth, editOrganization);
router.get('/myPosts', Auth, myPosts);
router.get('/info/:organizationId', Auth, info);



export default router