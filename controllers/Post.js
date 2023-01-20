import Post from '../models/post.js';
import User from '../models/user.js';

export const createPost = async (req, res) => {
    try {
        const content = req.body;
        console.log(content)
        console.log(req.files)

        let imagesUrl = [];
        if(req.files){
            console.log("ok")
            req.files.map(file => {
                imagesUrl.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`);
            })
        }
        if(!content) return res.status(403).json({message:"please add some content !!"});
        const newPost = new Post({
            ...req.body,
            img:imagesUrl,
            user:req.user._id});
        if(!newPost) return res.status(500).json({message:"something went wrong !!"});

        await newPost.save();

        let fullPost = await newPost.populate('user',"fullName profile_pic")
        return res.status(200).json(fullPost);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const allPosts = async (req, res) => {
    try {
        const getPosts = await Post.find({user: req.user._id})
            .populate('user', "fullName profile_pic")
            .populate({
                path: "comments",
                populate: {path: 'user',
                    model: 'user',
                    select: "fullName profile_pic"}})
            .sort({"createdAt": -1});
        return res.status(200).json(getPosts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deletePost = async (req, res) => {
    try {
        const {postid} = req.params;
        if (!postid) return res.status(404).json({message: "Post not found !!"});
        const getPost = await Post.findById(postid);
        if (!getPost) return res.status(404).json({message: "Post not Found !!"});
        if (getPost.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this post"})
        }
        await getPost.remove();
        return res.status(200).json({message: "Post Deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "something went wrong !!"});
    }
}

export const editPost = async (req, res) => {
    try {
        const getPost = await Post.findById(req.params.postid);
        if (!getPost) return res.status(400).json({message: "something went wrong !!"});

        if (getPost.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this post"})
        }
        const newPost = await Post.findOneAndUpdate(req.params.postid, req.body, {new: true});

        if (!newPost)
            return res.status(500).json({message: "something went wrong !!"});

        return res.status(200).json({data: newPost, message: "updated successfully "});
    } catch (error) {
        return res.status(500).json({message: "somthing went wrong !!"});
    }
}

export const myPosts = async (req, res) => {
    try {
        const getUser = await User.findById(req.user._id);
        if (!getUser) return res.status(404).json({message: "user not found !!"});
        let posts = await Promise.all(getUser.following.map(async (user) => {
            return Post.find({user})
                .populate('user', 'fullName profile_pic')
                .populate({
                    path: "comments",
                    populate: {
                        path: 'user',
                        model: 'user',
                        select: "fullName profile_pic"
                    }
                });
        }))
        const userPosts = await Post.find({user: req.user._id})
            .populate('user', 'fullName profile_pic')
            .populate({
                path: "comments",
                populate: {
                    path: 'user',
                    model: 'user',
                    select: "fullName profile_pic"
                }
            });
        return res.status(200)
            .json([...posts.filter(arr => arr.length !== 0)
                .flat(), ...userPosts]);
    } catch (error) {
        return res.status(500).json(error)
    }
}
