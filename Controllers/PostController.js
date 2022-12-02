import PostModel from '../Models/Post.js';


export const getAll = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userId);
        const userPosts = await PostModel.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return PostModel.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
    // try {
    //     const posts = await PostModel.find().populate('user').exec();
    //     res.json(posts);
    // } catch (err) {
    //     console.log(err);
    //     res.status(404).json({
    //         message: 'error',
    //     });
    // }
};

export const getOne = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Error get doc',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            desk: req.body.desk,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            userId: req.body.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error create',
        });
    }
};

export const update = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }

        // await PostModel.updateOne(
        //     {
        //         _id: postId,
        //     },
        //     {
        //         title: req.body.title,
        //         text: req.body.text,
        //         imageUrl: req.body.imageUrl,
        //         user: req.userId,
        //         tags: req.body.tags,
        //     },
        // );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};
export const like = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};