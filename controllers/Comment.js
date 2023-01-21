import Comment from '../models/comment.js';
import Post from '../models/post.js'
import comment from "../models/comment.js";

export const addCommentPost = async (req , res) => {
    try {
        const{comment , postId} = req.body;
        let post = await Post.findById(postId)
        if(!post) return res.status(404).json({message:"Post not found"});
        if(!comment) return res.status(403).json({message:"Please add some content !!"});
        const newComment =  new Comment({comment , user:req.user._id , post:postId});

        if(!newComment) return res.status(500).json({message:"something went wrong !!"});
        await newComment.save();
        let getPost = await Post.findByIdAndUpdate(postId , {$push:{comments:newComment._id}},{new:true})
        if(!getPost) return res.status(404).json({message:"Post not found"});
        return res.status(200).json(await newComment.populate('user' , "fullName avatarUrl"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const editCommentPost = async (req , res) => {
    try {
        let getComment = await Comment.findById(req.params.commentId)
        if(!getComment) return res.status(400).json({message: "something went wrong !!"});

        if (getComment.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this comment"})
        }
        const newComment = await Comment.findOneAndUpdate(req.params.commentId, req.body, {new: true});

        if (!newComment)
            return res.status(500).json({message: "something went wrong !!"});

        return res.status(200).json({data: newComment, message: "updated successfully "});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const deleteComment = async(req ,res) => {
    try {
        const {commentId,postId} = req.body;
        const getComment = await Comment.findById(commentId);
        if(!getComment) return res.status(404).json({message:"comment not found "});
        if(getComment.user.toString() === req.user._id.toString()){
            await getComment.remove();
            await Post.findByIdAndUpdate(postId,
                {$pull:{comments:commentId}},
                {new:true})
            return res.status(200).json({message:'comment Delete Successfully'})
        }else{
            return res.status(403).json({message:"this is not your comment !!!"})
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

