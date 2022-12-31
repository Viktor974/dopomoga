import User from '../models/user.js';

export const Follow = async (req , res) => {
    try {
        const {followId} = req.params;
        const checkUser = await User.findById(followId);
        if(!checkUser) return res.status(404).json({message:"opps this user not found !!"});
        var getUser = await User.findById(req.user._id);
        const FollowingUser = await User.findById(followId);
        if(getUser.following.includes(followId)){
            getUser = await User.findByIdAndUpdate(req.user._id , {$pull:{following:followId}} , {new:true} )
            await FollowingUser.update({$pull:{followers:getUser._id}})
        }else{
            getUser = await User.findByIdAndUpdate(req.user._id , {$push:{following:followId}} , {new:true} )
            await FollowingUser.update({$push:{followers:getUser._id}});
        }
        if(!getUser) return res.status(404).json({message:"you dont have an account !!"});
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
