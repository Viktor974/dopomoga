import Post from '../models/post.js';
import Donation from '../models/donation.js'

export const DonationLike = async (req , res ) => {
    try {
        const {donationId} = req.params;

        var getDonation= await Donation.findById(donationId);
        if(!getDonation) return res.status(404).json("Post not found !!")
        if(getDonation.like.includes(req.user._id)){
            getDonation = await Donation.findByIdAndUpdate(donationId , {$pull:{like:req.user._id}} , {new:true})
        }else{
            getDonation = await Donation.findByIdAndUpdate(donationId , {$push:{like:req.user._id}} , {new:true})
        }

        return res.status(200).json(await getDonation.populate('user' , "fullName profile_pic"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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
