import Organization from "../Models/Organization.js";
import PostModel from "../Models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = new Organization({
            name: req.body.title,
            imageUrl: req.body.imageUrl,
            creator: req.userId,
            text: req.body.text,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};


export const getAll = async (req, res) => {
    try {
        const posts = await Organization.find().exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};