import User from '../models/user.js';
import Cloudinary from '../middlewares/Cloudinary.js'

export const UserInfo = async (req, res) => {
    try {
        const getUser = await User.findById(req.params.userId).select('-password');
        if (!getUser) return res.status(404).json({message: "user not found!!"});
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const ProfileInfo = async (req, res) => {
    try {
        const SignedUser = await User.findById(req.user._id)
            .select('-password')
            .populate("followers", "profile_pic fullName");
        if (!SignedUser)
            return res.status(404)
                .json({message: "user not found!!"});
        return res.status(200).json(SignedUser);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const allUsers = async (req, res) => {
    try {
        const findUsers = await User.find({})
            .select('profile_pic fullName followers');
        if (!findUsers)
            return res.status(500)
                .json({message: "somthing went wrong !!"});
        return res.status(200)
            .json(findUsers.filter(user => user._id.toString() !== req.user._id.toString()));
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const editUser = async (req, res) => {
    try {
        if(req.file){
            req.body.profile_pic = req.file.path
        }


        const getUser = await User.findByIdAndUpdate(req.user._id,
            {
            ...req.body
        }, {new: true});

        if (!getUser) return res.status(404)
            .json({message: "user not found !!"});
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
