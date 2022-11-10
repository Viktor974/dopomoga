import express from 'express';
import mongo from 'mongoose'
import {registerValidation, loginValidation} from './Validation/auth.js'
import {organizationlidation} from './Validation/organization.js'
import {postCreateValidation} from './Validation/post.js'
import checkAuth from './Util/checkAuth.js'
import * as UserController from './Controllers/UserController.js'
import * as PostController from './Controllers/PostController.js'
import * as Organization from './Controllers/OrganizationController.js'

mongo
    .connect('mongodb+srv://viktor:32003200@dopomaga.oipxaa5.mongodb.net/dopomoga?retryWrites=true&w=majority')
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err))

const app = express();



app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/me', checkAuth, UserController.getMe);


app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.get('/posts/:id', PostController.getOne);
app.get('/posts', PostController.getAll);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.post('/organization',checkAuth, organizationlidation, Organization.create)
// app.get('/organization', checkAuth, Organization.remove())
// app.get('/organization/:id', Organization.getOne())
// app.get('/organization', Organization.getAll())
// app.get('/organization', checkAuth, organizationlidation, Organization.update())

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});