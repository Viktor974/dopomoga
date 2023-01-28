import express from "express"
import Auth from '../middlewares/Auth.js'
import {
    info,
    createOrganization,
    // addUser,
    editOrganization,
    deleteOrganization,
    allOrganizations
} from "../controllers/Organization.js"
import uploadOptions from '../middlewares/Uploads.js';

const router = express.Router()

router.post('/create', Auth, uploadOptions.array('images', 10), createOrganization);

router.get('/allOrg', Auth, allOrganizations);
router.put('/edit/:organizationId', Auth, uploadOptions.array('images', 10), editOrganization);
// router.get('/addUser/:userId', Auth, addUser);
router.get('/info/:organizationId', Auth, info);
router.delete('/delete/:organizationId', Auth, deleteOrganization);



export default router