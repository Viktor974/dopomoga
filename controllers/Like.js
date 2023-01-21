import Post from '../models/post.js';
import Comment from '../models/comment.js';

export const PostLike = async (req , res ) => {
    try {
        const {postId} = req.params;

        var getPost = await Post.findById(postId);
        if(!getPost) return res.status(404).json("Post not found !!")
        if(getPost.like.includes(req.user._id)){
            getPost = await Post.findByIdAndUpdate(postId , {$pull:{like:req.user._id}} , {new:true})
        }else{
            getPost = await Post.findByIdAndUpdate(postId , {$push:{like:req.user._id}} , {new:true})
        }

        return res.status(200).json(await getPost.populate('user' , "fullName profile_pic"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const CommentLike = async (req , res ) => {
    try {
        const {commentId} = req.params;

        var getPost = await Comment.findById(commentId);
        if(!getPost) return res.status(404).json("Comment not found !!")
        if(getPost.like.includes(req.user._id)){
            getPost = await Comment.findByIdAndUpdate(commentId , {$pull:{like:req.user._id}} , {new:true})
        }else{
            getPost = await Comment.findByIdAndUpdate(commentId , {$push:{like:req.user._id}} , {new:true})
        }

        return res.status(200).json(await getPost.populate('user' , "fullName profile_pic"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
