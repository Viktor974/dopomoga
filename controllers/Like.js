import Post from '../models/post.js';

export default async (req , res ) => {
    try {
        const {postId} = req.params;

        var getPost = await Post.findById(postId);
        if(!getPost) return res.status(404).json("Post not found !!")
        if(getPost.like.includes(req.user._id)){
            getPost = await Post.findByIdAndUpdate(postId , {$pull:{like:req.user._id}} , {new:true})
        }else{
            getPost = await Post.findByIdAndUpdate(postId , {$push:{like:req.user._id}} , {new:true})
        }

        return res.status(200).json(await getPost.populate('user' , "fullName avatarUrl"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
