import Comment from '../models/comment.js';
import Donation from '../models/donation.js'
import Post from '../models/post.js'

export const addCommentDonation = async (req , res) => {
    try {
        const{comment , donationId} = req.body;
        if(!comment) return res.status(403).json({message:"Please add some content !!"});
        const newComment =  new Comment({comment , user:req.user._id , donation:donationId});

        if(!newComment) return res.status(500).json({message:"something went wrong !!"});
        await newComment.save();
        let getDonation = await Donation.findByIdAndUpdate(donationId , {$push:{comments:newComment._id}},{new:true})
        if(!getDonation) return res.status(404).json({message:"Donation not found"});
        return res.status(200).json(await newComment.populate('user' , "fullName avatarUrl"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
export const addCommentPost = async (req , res) => {
    try {
        const{comment , postId} = req.body;
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

export const deleteComment = async(req ,res) => {
    try {
        const {commentId} = req.params;
        const getComment = await Comment.findById(commentId);
        if(!getComment) return res.status(404).json({message:"comment not found "});
        if(getComment.user.toString() === req.user._id.toString()){
            await getComment.remove();
            return res.status(200).json({message:'comment Delete Successfully'})
        }else{
            return res.status(403).json({message:"this is not your comment !!!"})
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

